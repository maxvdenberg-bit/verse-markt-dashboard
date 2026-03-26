import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://olayxoryjxuzobteaiqx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYXl4b3J5anh1em9idGVhaXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0ODUwOTksImV4cCI6MjA5MDA2MTA5OX0.2fTZ7bv25PvFIEy5_8w0TI6xl3BunIeEWcdEgDIqTz0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const ADMIN_EMAIL = 'maxvandenberg@pm-online-solutions.com'
