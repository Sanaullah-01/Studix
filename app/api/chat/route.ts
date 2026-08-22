import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Interact with the AI Assistant
 *     description: Sends a message to the AI Assistant and returns a streaming response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Streaming response from the AI
 *       401:
 *         description: Unauthorized
 */
export async function POST(req: Request) {
  const { messages } = await req.json();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // if (!user) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  // Sanitize messages to avoid validation errors from mismatched SDK versions
  const sanitizedMessages = (messages || []).map((m: any) => {
    // If the client sends 'parts' instead of 'content', convert it back
    if (m.parts && !m.content) {
      if (Array.isArray(m.parts)) {
        m.content = m.parts.map((p: any) => p.text || '').join('');
      } else {
        m.content = m.parts;
      }
      delete m.parts;
    }
    
    if (m.role === 'tool' && !Array.isArray(m.content)) {
      m.content = typeof m.content === 'string' ? [{ type: 'text', text: m.content }] : [];
    }
    return m;
  }).filter((m: any) => {
    if (m.tool_calls && m.tool_calls.length > 0) return false;
    if (m.role === 'tool' || m.role === 'function') return false; 
    return true;
  });

  // Dynamically select the model based on available API keys
  let selectedModel;
  if (process.env.OPENAI_API_KEY) {
    const { openai } = require('@ai-sdk/openai');
    selectedModel = openai('gpt-4o-mini');
  } else if (process.env.OPENROUTER_API_KEY) {
    selectedModel = openrouter('liquid/lfm-2.5-2.6b:free');
  } else {
    return new Response('No AI provider API keys found. Please set OPENROUTER_API_KEY or OPENAI_API_KEY.', { status: 401 });
  }

  const result = streamText({
    model: selectedModel,
    messages: sanitizedMessages,
    system: "You are the intelligent AI Assistant for Studix. You are deeply integrated into the student's dashboard. You can read their notes, check their upcoming assignments, and parse uploaded PDFs. Always be helpful, concise, and format your responses nicely in markdown. If you need information you don't have, use a tool to fetch it.",
    tools: {
      get_courses: tool({
        description: 'Get a list of all courses the student is enrolled in.',
        parameters: z.object({}),
        execute: async () => {
          const { data, error } = await supabase.from('courses').select('*');
          if (error) return { error: error.message };
          return data;
        },
      }),
      get_assignments: tool({
        description: 'Get a list of the student\'s assignments (To Do, In Progress, Completed).',
        parameters: z.object({}),
        execute: async () => {
          const { data, error } = await supabase.from('assignments').select('*, courses(title)').order('due_date', { ascending: true });
          if (error) return { error: error.message };
          return data;
        },
      }),
      get_notes_summary: tool({
        description: 'Get a list of all the student\'s notes with their IDs, titles, and creation dates. Use this to find the ID of a specific note before calling read_note_details.',
        parameters: z.object({}),
        execute: async () => {
          const { data, error } = await supabase.from('notes').select('id, title, created_at, file_url, courses(title)').order('created_at', { ascending: false });
          if (error) return { error: error.message };
          return data;
        },
      }),
      read_note_details: tool({
        description: 'Get the full text content of a specific note, and automatically extract text from its attached PDF if it has one.',
        parameters: z.object({
          noteId: z.string().describe('The UUID of the note to read.'),
        }),
        execute: async ({ noteId }) => {
          const { data: note, error } = await supabase.from('notes').select('*').eq('id', noteId).single();
          if (error) return { error: error.message };
          if (!note) return { error: 'Note not found' };

          let pdfText = null;
          if (note.file_url && note.file_url.endsWith('.pdf')) {
            try {
              const res = await fetch(note.file_url);
              const buffer = await res.arrayBuffer();
              const pdf = require('pdf-parse');
              const parsed = await pdf(Buffer.from(buffer));
              pdfText = parsed.text;
            } catch (err: any) {
              pdfText = `Error parsing PDF: ${err.message}`;
            }
          }

          return {
            title: note.title,
            content: note.content,
            pdfExtractedText: pdfText,
            createdAt: note.created_at,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}

