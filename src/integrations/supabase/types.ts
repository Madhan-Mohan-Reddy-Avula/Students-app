export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      class_timetable: {
        Row: {
          class_id: string
          created_at: string
          day_of_week: string
          end_time: string
          faculty: string
          id: string
          room: string | null
          start_time: string
          subject: string
        }
        Insert: {
          class_id: string
          created_at?: string
          day_of_week: string
          end_time: string
          faculty: string
          id?: string
          room?: string | null
          start_time: string
          subject: string
        }
        Update: {
          class_id?: string
          created_at?: string
          day_of_week?: string
          end_time?: string
          faculty?: string
          id?: string
          room?: string | null
          start_time?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_timetable_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string
          id: string
          name: string
          section: string | null
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          section?: string | null
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          section?: string | null
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      exam_timetable: {
        Row: {
          class_id: string
          created_at: string
          end_time: string
          exam_date: string
          exam_type: string | null
          id: string
          room: string | null
          start_time: string
          subject: string
        }
        Insert: {
          class_id: string
          created_at?: string
          end_time: string
          exam_date: string
          exam_type?: string | null
          id?: string
          room?: string | null
          start_time: string
          subject: string
        }
        Update: {
          class_id?: string
          created_at?: string
          end_time?: string
          exam_date?: string
          exam_type?: string | null
          id?: string
          room?: string | null
          start_time?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_timetable_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      homework_assignments: {
        Row: {
          assigned_date: string
          class_id: string
          created_at: string
          description: string | null
          due_date: string
          id: string
          status: string | null
          subject: string
          title: string
        }
        Insert: {
          assigned_date: string
          class_id: string
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          status?: string | null
          subject: string
          title: string
        }
        Update: {
          assigned_date?: string
          class_id?: string
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          status?: string | null
          subject?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "homework_assignments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          class_id: string | null
          created_at: string
          department: string
          email: string
          id: string
          name: string
          phone: string | null
          roll_number: string
          updated_at: string
          user_id: string | null
          year: number
        }
        Insert: {
          avatar_url?: string | null
          class_id?: string | null
          created_at?: string
          department: string
          email: string
          id?: string
          name: string
          phone?: string | null
          roll_number: string
          updated_at?: string
          user_id?: string | null
          year: number
        }
        Update: {
          avatar_url?: string | null
          class_id?: string | null
          created_at?: string
          department?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          roll_number?: string
          updated_at?: string
          user_id?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          created_at: string
          exam_date: string | null
          exam_type: string | null
          grade: string | null
          id: string
          marks: number
          student_id: string
          subject: string
          total_marks: number
        }
        Insert: {
          created_at?: string
          exam_date?: string | null
          exam_type?: string | null
          grade?: string | null
          id?: string
          marks: number
          student_id: string
          subject: string
          total_marks?: number
        }
        Update: {
          created_at?: string
          exam_date?: string | null
          exam_type?: string | null
          grade?: string | null
          id?: string
          marks?: number
          student_id?: string
          subject?: string
          total_marks?: number
        }
        Relationships: [
          {
            foreignKeyName: "results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      school_events: {
        Row: {
          category: string
          created_at: string
          description: string | null
          event_date: string
          id: string
          is_featured: boolean | null
          location: string | null
          participants_info: string | null
          start_time: string | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          event_date: string
          id?: string
          is_featured?: boolean | null
          location?: string | null
          participants_info?: string | null
          start_time?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          event_date?: string
          id?: string
          is_featured?: boolean | null
          location?: string | null
          participants_info?: string | null
          start_time?: string | null
          title?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
