import { createClient } from "@supabase/supabase-js"

const vtxbwvyjssckfmghgcfy = process.env.NEXT_PUBLIC_SUPABASE_URL!
const eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0eGJ3dnlqc3Nja2ZtZ2hnY2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MzM0ODEsImV4cCI6MjA2NDMwOTQ4MX0.QRJemei1LKjizliZdlpaKFqX8x7FpcYIJFbQO6JsfUY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(vtxbwvyjssckfmghgcfy, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0eGJ3dnlqc3Nja2ZtZ2hnY2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MzM0ODEsImV4cCI6MjA2NDMwOTQ4MX0.QRJemei1LKjizliZdlpaKFqX8x7FpcYIJFbQO6JsfUY)

// Client-side Supabase client (singleton pattern)
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(vtxbwvyjssckfmghgcfy, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0eGJ3dnlqc3Nja2ZtZ2hnY2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MzM0ODEsImV4cCI6MjA2NDMwOTQ4MX0.QRJemei1LKjizliZdlpaKFqX8x7FpcYIJFbQO6JsfUY)
  }
  return supabaseClient
}
