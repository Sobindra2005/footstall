
import { createClient } from "@/utils/supabase/server";
import { LoginInput, SignupInput } from "@/lib/validations/auth";

export class AuthService {
  /**
   * Helper to get an authenticated Supabase server client.
   * Handles the async cookieStore internally.
   */
  private static async getClient() {
    return createClient();
  }

  /**
   * Sign up a new user using Supabase Auth.
   */
  static async signup(input: SignupInput) {
    const supabase = await this.getClient();
    
    // Attempt signup
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    });

    if (error) {
      throw error;
    }

    return data.user;
  }

  /**
   * Log in an existing user using Supabase Auth.
   */
  static async login(input: LoginInput) {
    const supabase = await this.getClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      throw error;
    }

    return data.user;
  }

  /**
   * Log out the current user.
   */
  static async logout() {
    const supabase = await this.getClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    return true;
  }

  /**
   * Fetch the current authenticated user's session safely.
   */
  static async getCurrentUser() {
    const supabase = await this.getClient();
    
    // We use getUser() instead of getSession() for security, 
    // as it securely validates the token against the Supabase server.
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return data.user;
  }
}
