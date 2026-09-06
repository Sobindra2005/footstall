import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

async function check() {
  const { data, error } = await supabase.from('user_roles').select('*').eq('user_id', 'e5e65aab-a213-41e7-afb7-34eb49656119');
  console.log("Roles for user e5e65aab-a213-41e7-afb7-34eb49656119:", data, error);
}

check();
