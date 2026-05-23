import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://uqnubywtcusrjwtoefxz.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxbnVieXd0Y3Vzcmp3dG9lZnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MTQyMDcsImV4cCI6MjA4ODM5MDIwN30.m58pgiPm12pwQrbpcA1NFZ3M8Z9bMJ1c_uX7tecbSu4';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }
}