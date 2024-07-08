import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bdmulytkkwfaehbvtpuq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkbXVseXRra3dmYWVoYnZ0cHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNzA5NzgsImV4cCI6MjAzMzc0Njk3OH0.BD5wxy6e9XQT88V8eTDmOW9a6AdAlK6HY6HYlUN4R0c";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
