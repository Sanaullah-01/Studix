export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          student_id: string | null
          department: string | null
          semester: number | null
          avatar_url: string | null
          welcome_email_sent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          student_id?: string | null
          department?: string | null
          semester?: number | null
          avatar_url?: string | null
          welcome_email_sent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          student_id?: string | null
          department?: string | null
          semester?: number | null
          avatar_url?: string | null
          welcome_email_sent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          student_id: string
          name: string
          code: string | null
          instructor: string | null
          description: string | null
          semester: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          name: string
          code?: string | null
          instructor?: string | null
          description?: string | null
          semester?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          name?: string
          code?: string | null
          instructor?: string | null
          description?: string | null
          semester?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      assignments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          title: string
          description: string | null
          due_date: string | null
          priority: 'low' | 'medium' | 'high' | null
          status: 'pending' | 'in_progress' | 'completed' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          title: string
          description?: string | null
          due_date?: string | null
          priority?: 'low' | 'medium' | 'high' | null
          status?: 'pending' | 'in_progress' | 'completed' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          title?: string
          description?: string | null
          due_date?: string | null
          priority?: 'low' | 'medium' | 'high' | null
          status?: 'pending' | 'in_progress' | 'completed' | null
          created_at?: string
          updated_at?: string
        }
      }
      notes: {
        Row: {
          id: string
          student_id: string
          course_id: string | null
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id?: string | null
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string | null
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      study_sessions: {
        Row: {
          id: string
          student_id: string
          course_id: string | null
          topic: string | null
          duration: number | null
          study_date: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id?: string | null
          topic?: string | null
          duration?: number | null
          study_date?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string | null
          topic?: string | null
          duration?: number | null
          study_date?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      ai_conversations: {
        Row: {
          id: string
          student_id: string
          title: string | null
          mode: 'chat' | 'summarize' | 'explain' | 'quiz' | 'flashcards' | 'study-plan' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          title?: string | null
          mode?: 'chat' | 'summarize' | 'explain' | 'quiz' | 'flashcards' | 'study-plan' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          title?: string | null
          mode?: 'chat' | 'summarize' | 'explain' | 'quiz' | 'flashcards' | 'study-plan' | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_messages: {
        Row: {
          id: string
          conversation_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: 'user' | 'assistant' | 'system'
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
