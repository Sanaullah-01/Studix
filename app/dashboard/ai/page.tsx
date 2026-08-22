"use client";

import { useChat } from '@ai-sdk/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotMessageSquare, User, Loader2, Send, Paperclip, Wrench, FileText, CheckCircle2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function AIPage() {
  const [localInput, setLocalInput] = React.useState("");
  const chat = useChat({
    maxSteps: 5,
  });
  console.log("USECHAT RETURN:", Object.keys(chat));
  const { messages, isLoading, error } = chat;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setLocalInput(""); // Clear immediately
    
    try {
      if ('append' in chat && typeof (chat as any).append === 'function') {
        (chat as any).append({ role: 'user', content: text });
      } else if ('sendMessage' in chat && typeof (chat as any).sendMessage === 'function') {
        (chat as any).sendMessage({ role: 'user', content: text, text: text });
      } else {
        // Fallback for completely broken SDK
        if (typeof (chat as any).setMessages === 'function') {
          (chat as any).setMessages((prev: any) => [...prev, { id: Date.now().toString(), role: 'user', content: text }]);
        }
        console.error("No valid send method found in chat SDK.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderInput = () => (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(localInput);
      }} 
      className="flex gap-3 w-full max-w-2xl mx-auto relative mt-8"
    >
      <div className="relative flex-1">
        <Input
          name="chatInput"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          placeholder="Ask about your notes or assignments..."
          className="w-full pl-4 pr-12 py-6 rounded-3xl bg-muted/30 border-border/60 focus-visible:ring-primary shadow-lg text-base"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading || !localInput.trim()}
        className="h-auto py-0 px-6 rounded-3xl shadow-sm"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
      </Button>
    </form>
  );

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-theme(spacing.16))] p-4 md:p-8 pt-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight font-heading">AI Assistant</h2>
          <p className="text-muted-foreground mt-1">Ask questions about your notes, assignments, and courses.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden rounded-[1.5rem] border-border/40 shadow-xl bg-background">
        <ScrollArea className="flex-1 p-4 sm:p-6" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4 text-muted-foreground mt-[10vh]">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm border border-primary/20">
                <BotMessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">How can I help you today?</h3>
              <p className="max-w-md text-base">
                I can summarize your PDF notes, check your upcoming assignments, or help you plan your study sessions.
              </p>
              
              <div className="w-full">
                {renderInput()}
              </div>

              <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl mt-8">
                <Button 
                  variant="outline" 
                  className="rounded-full shadow-sm" 
                  onClick={() => sendMessage("What assignments do I have due?")}
                >
                  "What assignments do I have due?"
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full shadow-sm" 
                  onClick={() => sendMessage("Summarize my most recent note.")}
                >
                  "Summarize my most recent note."
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex w-full", m.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "flex gap-4 max-w-[85%] sm:max-w-[75%]",
                    m.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                      m.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-foreground"
                    )}>
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <BotMessageSquare className="w-4 h-4" />}
                    </div>
                    
                    <div className={cn(
                      "rounded-2xl px-5 py-4",
                      m.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted/40 border border-border/50 rounded-tl-sm"
                    )}>
                      {(m.content || (m.parts && m.parts.length > 0)) && (
                        <div className={cn("prose prose-sm max-w-none", m.role === 'user' ? "text-primary-foreground prose-invert" : "dark:prose-invert")}>
                          <ReactMarkdown>
                            {m.content || (m.parts ? (m.parts as any[]).map((p: any) => p.text).join('') : '')}
                          </ReactMarkdown>
                        </div>
                      )}
                      
                      {/* Tool Calls Rendering */}
                      {m.toolInvocations?.map((toolInvocation) => {
                        const toolCallId = toolInvocation.toolCallId;
                        const state = toolInvocation.state;
                        
                        return (
                          <div key={toolCallId} className="mt-3 p-3 bg-background border border-border/50 rounded-xl text-xs flex flex-col gap-2 shadow-sm">
                            <div className="flex items-center gap-2 font-medium text-foreground">
                              {state === 'call' ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                              ) : (
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                              )}
                              <span>
                                {toolInvocation.toolName === 'get_assignments' && "Checking assignments..."}
                                {toolInvocation.toolName === 'get_courses' && "Fetching courses..."}
                                {toolInvocation.toolName === 'get_notes_summary' && "Looking through notes..."}
                                {toolInvocation.toolName === 'read_note_details' && "Reading specific note and PDF..."}
                                {![
                                  'get_assignments',
                                  'get_courses',
                                  'get_notes_summary',
                                  'read_note_details'
                                ].includes(toolInvocation.toolName) && `Using tool: ${toolInvocation.toolName}...`}
                              </span>
                            </div>
                            
                            {state === 'result' && (
                              <div className="text-muted-foreground pl-5 border-l-2 border-border/60 ml-1">
                                {toolInvocation.toolName === 'read_note_details' && toolInvocation.result?.pdfExtractedText ? (
                                  <span className="flex items-center"><FileText className="w-3 h-3 mr-1" /> PDF extracted successfully</span>
                                ) : (
                                  "Data retrieved."
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex w-full justify-start">
                  <div className="flex gap-4 max-w-[85%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center shadow-sm">
                      <BotMessageSquare className="w-4 h-4" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm px-5 py-4 bg-muted/40 border border-border/50 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive text-sm rounded-lg text-center max-w-2xl w-full mx-auto border border-destructive/20">
              <span className="font-semibold">Error:</span> {error.message || 'An unexpected error occurred. Please try again.'}
            </div>
          )}
        </ScrollArea>

        {messages.length > 0 && (
          <div className="p-4 bg-background border-t border-border/40">
            {renderInput()}
          </div>
        )}
      </Card>
    </div>
  );
}
