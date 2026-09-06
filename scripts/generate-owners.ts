import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in .env.local");
  console.error("Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local file. You can find it in your Supabase Dashboard under Project Settings > API.");
  process.exit(1);
}

// Create a Supabase client with the service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

function generateRandomPassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

async function generateOwners() {
  console.log("Fetching pitches...");
  const { data: pitches, error: fetchError } = await supabase.from("pitches").select("id, name, slug");

  if (fetchError || !pitches) {
    console.error("❌ Error fetching pitches:", fetchError);
    process.exit(1);
  }

  console.log(`Found ${pitches.length} pitches. Generating owners...`);

  let successCount = 0;

  for (const pitch of pitches) {
    const email = `${pitch.slug}@footstall.com`;
    const password = generateRandomPassword();

    try {
      // 1. Create User
      const { data: userData, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError) {
        if (createError.message.includes("already registered")) {
          console.log(`⚠️ User ${email} already exists. Skipping...`);
          continue;
        }
        console.error(`❌ Failed to create user for ${pitch.name}:`, createError.message);
        continue;
      }

      const userId = userData.user.id;

      // 2. Assign Role (owner)
      const { error: roleError } = await supabase.from("user_roles").upsert({
        user_id: userId,
        role: "owner",
      });

      if (roleError) {
        console.error(`❌ Failed to assign role for ${pitch.name}:`, roleError.message);
      }

      // 3. Update Pitch with Owner ID
      const { error: updateError } = await supabase
        .from("pitches")
        .update({ owner_id: userId })
        .eq("id", pitch.id);

      if (updateError) {
        console.error(`❌ Failed to link owner to pitch ${pitch.name}:`, updateError.message);
      }

      // 4. Save Credentials for Super Admin to view
      const { error: credError } = await supabase.from("owner_credentials").insert({
        pitch_id: pitch.id,
        email,
        password,
      });

      if (credError) {
        console.error(`❌ Failed to save credentials for ${pitch.name}:`, credError.message);
      } else {
        console.log(`✅ Assigned owner ${email} to ${pitch.name}`);
        successCount++;
      }

    } catch (err: any) {
      console.error(`❌ Unexpected error for ${pitch.name}:`, err.message);
    }
  }

  console.log(`\n🎉 Successfully generated and assigned ${successCount} owners.`);
  console.log("The credentials are now stored securely in the database for the Super Admin to view.");
}

generateOwners();
