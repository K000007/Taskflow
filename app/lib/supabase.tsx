/**
 * Supabase helper available to both client & server components.
 *
 * We ONLY create the client when the two required public env-vars
 * are present. Otherwise we export `null` and consumers can fall
 * back to local-storage or another offline strategy.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const HAS_SUPABASE =
  typeof supabaseUrl === "string" &&
  supabaseUrl.length > 0 &&
  typeof supabaseAnonKey === "string" &&
  supabaseAnonKey.length > 0

export const supabase: SupabaseClient | null = HAS_SUPABASE ? createClient(supabaseUrl!, supabaseAnonKey!) : null

/**
 *   import { supabase, HAS_SUPABASE } from "@/app/lib/supabase"
 *   if (!HAS_SUPABASE) { …use offline fallback… }
 */

/* ---------- Optional generated types ---------- */
export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          completed: boolean
          priority: "low" | "medium" | "high"
          due_date: string | null
          category: string
          created_at: string
          updated_at: string
          user_id: string | null
          started_at: string | null
          completed_at: string | null
          total_time_spent: number | null
          is_active: boolean
        }
        Insert: Omit<Database["public"]["Tables"]["tasks"]["Row"], "id" | "created_at" | "updated_at"> & { id?: string }
        Update: Partial<Database["public"]["Tables"]["tasks"]["Row"]>
      }
      /* …task_history & time_sessions definitions unchanged… */
    }
  }
}
