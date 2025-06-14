export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          class_timetable_id: string
          created_at: string
          date: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          class_timetable_id: string
          created_at?: string
          date: string
          id?: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          class_timetable_id?: string
          created_at?: string
          date?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_class_timetable_id_fkey"
            columns: ["class_timetable_id"]
            isOneToOne: false
            referencedRelation: "timetable"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      event_registrations: {
        Row: {
          attendance_status: string | null
          email: string | null
          event_id: string
          group_size: number | null
          id: string
          message: string | null
          name: string | null
          participation_type: string | null
          phone: string | null
          registered_at: string
          skill_level: string | null
          status: string | null
          student_id: string
        }
        Insert: {
          attendance_status?: string | null
          email?: string | null
          event_id: string
          group_size?: number | null
          id?: string
          message?: string | null
          name?: string | null
          participation_type?: string | null
          phone?: string | null
          registered_at?: string
          skill_level?: string | null
          status?: string | null
          student_id: string
        }
        Update: {
          attendance_status?: string | null
          email?: string | null
          event_id?: string
          group_size?: number | null
          id?: string
          message?: string | null
          name?: string | null
          participation_type?: string | null
          phone?: string | null
          registered_at?: string
          skill_level?: string | null
          status?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "school_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          class_id: string | null
          created_at: string
          duration_minutes: number
          end_date: string | null
          exam_date: string
          exam_type: string
          id: string
          instructions: string | null
          location: string | null
          max_score: number
          pdf_reference_url: string | null
          room: string | null
          start_date: string | null
          start_time: string | null
          subject_id: string
          syllabus_coverage: string | null
          type: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          duration_minutes?: number
          end_date?: string | null
          exam_date: string
          exam_type: string
          id?: string
          instructions?: string | null
          location?: string | null
          max_score?: number
          pdf_reference_url?: string | null
          room?: string | null
          start_date?: string | null
          start_time?: string | null
          subject_id: string
          syllabus_coverage?: string | null
          type?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string
          duration_minutes?: number
          end_date?: string | null
          exam_date?: string
          exam_type?: string
          id?: string
          instructions?: string | null
          location?: string | null
          max_score?: number
          pdf_reference_url?: string | null
          room?: string | null
          start_date?: string | null
          start_time?: string | null
          subject_id?: string
          syllabus_coverage?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exams_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      faculty: {
        Row: {
          created_at: string
          department: string
          email: string
          id: string
          name: string
          phone: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          email: string
          id?: string
          name: string
          phone?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      homework: {
        Row: {
          created_at: string
          description: string | null
          due_date: string
          id: string
          status: string
          subject_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          status?: string
          subject_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          status?: string
          subject_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "homework_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      homework_assignments: {
        Row: {
          class_id: string | null
          created_at: string
          description: string | null
          due_date: string
          faculty_id: string | null
          id: string
          priority: string
          status: string
          subject: string
          title: string
          updated_at: string
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          due_date: string
          faculty_id?: string | null
          id?: string
          priority?: string
          status?: string
          subject: string
          title: string
          updated_at?: string
        }
        Update: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string
          faculty_id?: string | null
          id?: string
          priority?: string
          status?: string
          subject?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "homework_assignments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "homework_assignments_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
        ]
      }
      homework_submissions: {
        Row: {
          feedback: string | null
          grade: number | null
          homework_id: string
          id: string
          status: string
          student_id: string
          submitted_at: string | null
        }
        Insert: {
          feedback?: string | null
          grade?: number | null
          homework_id: string
          id?: string
          status?: string
          student_id: string
          submitted_at?: string | null
        }
        Update: {
          feedback?: string | null
          grade?: number | null
          homework_id?: string
          id?: string
          status?: string
          student_id?: string
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homework_submissions_homework_id_fkey"
            columns: ["homework_id"]
            isOneToOne: false
            referencedRelation: "homework"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "homework_submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
          password_hash: string | null
          phone: string | null
          roll_number: string
          updated_at: string
          year: number
        }
        Insert: {
          avatar_url?: string | null
          class_id?: string | null
          created_at?: string
          department: string
          email: string
          id: string
          name: string
          password_hash?: string | null
          phone?: string | null
          roll_number: string
          updated_at?: string
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
          password_hash?: string | null
          phone?: string | null
          roll_number?: string
          updated_at?: string
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
          exam_id: string
          grade: string | null
          id: string
          rank: number | null
          score: number
          student_id: string
          total_students: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          exam_id: string
          grade?: string | null
          id?: string
          rank?: number | null
          score: number
          student_id: string
          total_students?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          exam_id?: string
          grade?: string | null
          id?: string
          rank?: number | null
          score?: number
          student_id?: string
          total_students?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "results_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
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
          category: string | null
          created_at: string
          description: string | null
          end_date: string | null
          event_date: string
          event_type: string
          id: string
          is_featured: boolean | null
          is_mandatory: boolean
          location: string | null
          participants_info: string | null
          start_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_date: string
          event_type?: string
          id?: string
          is_featured?: boolean | null
          is_mandatory?: boolean
          location?: string | null
          participants_info?: string | null
          start_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_date?: string
          event_type?: string
          id?: string
          is_featured?: boolean | null
          is_mandatory?: boolean
          location?: string | null
          participants_info?: string | null
          start_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      student_assignments: {
        Row: {
          assignment_id: string
          created_at: string
          id: string
          notes: string | null
          status: string
          submission_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assignment_id: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          submission_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assignment_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          submission_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_assignments_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "homework_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_results: {
        Row: {
          class_rank: number | null
          created_at: string
          current_grade: string | null
          current_score: number
          exam_date: string
          exam_type: string
          id: string
          max_score: number
          previous_score: number | null
          subject: string
          total_students: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          class_rank?: number | null
          created_at?: string
          current_grade?: string | null
          current_score: number
          exam_date: string
          exam_type: string
          id?: string
          max_score?: number
          previous_score?: number | null
          subject: string
          total_students?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          class_rank?: number | null
          created_at?: string
          current_grade?: string | null
          current_score?: number
          exam_date?: string
          exam_type?: string
          id?: string
          max_score?: number
          previous_score?: number | null
          subject?: string
          total_students?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          code: string
          created_at: string
          credits: number
          department: string
          department_id: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          credits?: number
          department: string
          department_id?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          credits?: number
          department?: string
          department_id?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      timetable: {
        Row: {
          class_id: string | null
          class_type: string
          created_at: string
          date: string | null
          day_of_week: number
          end_time: string
          faculty_id: string | null
          id: string
          room_location: string | null
          start_time: string
          subject_id: string
          teacher: string
        }
        Insert: {
          class_id?: string | null
          class_type?: string
          created_at?: string
          date?: string | null
          day_of_week: number
          end_time: string
          faculty_id?: string | null
          id?: string
          room_location?: string | null
          start_time: string
          subject_id: string
          teacher: string
        }
        Update: {
          class_id?: string | null
          class_type?: string
          created_at?: string
          date?: string | null
          day_of_week?: number
          end_time?: string
          faculty_id?: string | null
          id?: string
          room_location?: string | null
          start_time?: string
          subject_id?: string
          teacher?: string
        }
        Relationships: [
          {
            foreignKeyName: "timetable_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetable_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetable_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
