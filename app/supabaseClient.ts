import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmettlpxvcenydjyutiv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZXR0bHB4dmNlbnlkanl1dGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MDIwNzUsImV4cCI6MjA0ODI3ODA3NX0.AQFvYqumEwZKvX3G43oo40coR8Ng5R_GGfFfd7uFljE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
