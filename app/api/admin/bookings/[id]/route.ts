import { createClient } from "@/utils/supabase/server";
import { createErrorResponse, createSuccessResponse } from "@/types/api";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createErrorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    // Check Role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!roleData || roleData.role !== "owner") {
      return createErrorResponse("Forbidden", "FORBIDDEN", 403);
    }

    const body = await request.json();
    const { status } = body;

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return createErrorResponse("Invalid status", "BAD_REQUEST", 400);
    }

    // Update the booking. Note: RLS ensures owners can only update bookings for their pitches
    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return createErrorResponse(error.message, "DB_ERROR");
    }

    return createSuccessResponse(data);
  } catch (error: any) {
    return createErrorResponse(error.message || "Internal Server Error");
  }
}
