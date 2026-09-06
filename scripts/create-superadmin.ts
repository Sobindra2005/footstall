import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createSuperAdmin() {
  const email = "superadmin@footstall.com";
  // Generate a random 12 character password
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  console.log("Creating Super Admin user...");

  // 1. Create User
  const { data: userData, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  let userId;

  if (createError) {
    if (createError.message.includes("already registered")) {
      console.log(`⚠️ User ${email} already exists. Attempting to fetch their ID to ensure they have the super_admin role.`);
      
      // We need the user's ID to assign the role. Since admin.createUser failed, 
      // we can query the auth.users table (not directly possible via standard JS client without a custom RPC or direct Postgres connection).
      // However, we can use the admin API listUsers to find them.
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) {
        console.error("❌ Failed to list users to find existing superadmin:", listError.message);
        process.exit(1);
      }
      const existingUser = users.find(u => u.email === email);
      if (!existingUser) {
        console.error("❌ Could not find the existing superadmin user.");
        process.exit(1);
      }
      userId = existingUser.id;
      
      // Update password so we know what it is
      await supabase.auth.admin.updateUserById(userId, { password });
      console.log("✅ Reset password for existing superadmin user.");
    } else {
      console.error(`❌ Failed to create super admin:`, createError.message);
      process.exit(1);
    }
  } else {
    userId = userData.user.id;
    console.log("✅ Super Admin user created.");
  }

  // 2. Assign Role (super_admin)
  const { error: roleError } = await supabase.from("user_roles").upsert({
    user_id: userId,
    role: "super_admin",
  });

  if (roleError) {
    console.error(`❌ Failed to assign super_admin role:`, roleError.message);
    process.exit(1);
  }

  console.log("✅ Assigned super_admin role.");

  // Save to a local text file so the user has it
  const filePath = path.join(process.cwd(), "superadmin-credentials.txt");
  const content = `Super Admin Credentials\n=======================\nEmail: ${email}\nPassword: ${password}\n\nLogin at: http://localhost:3000/login\nDashboard: http://localhost:3000/superadmin\n`;
  
  fs.writeFileSync(filePath, content);

  console.log(`\n🎉 Super Admin account is ready!`);
  console.log(`Credentials have been saved to: ${filePath}`);
  console.log(`\nEmail: ${email}\nPassword: ${password}\n`);
}

createSuperAdmin();
