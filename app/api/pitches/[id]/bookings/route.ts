import { createClient } from "@/utils/supabase/server";
import { createErrorResponse, createSuccessResponse } from "@/types/api";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return createErrorResponse("Date parameter is required.", "BAD_REQUEST", 400);
    }

    // We can handle both id or slug since pitches page routes might use slug. 
    // Let's resolve the pitch ID first if params.id is a slug.
    let pitchId = params.id;
    
    // Check if it's a UUID, if not, it's a slug, we need to fetch the real ID.
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pitchId);
    
    if (!isUuid) {
      const { data: pitchInfo } = await supabase
        .from("pitches")
        .select("id")
        .eq("slug", pitchId)
        .single();
        
      if (pitchInfo) {
        pitchId = pitchInfo.id;
      }
    }

    // Fetch all confirmed bookings for this pitch on the given date
    const { data, error } = await supabase
      .from("bookings")
      .select("time_slot")
      .eq("pitch_id", pitchId)
      .eq("booking_date", date)
      .eq("status", "confirmed");

    if (error) {
      return createErrorResponse(error.message, "DB_ERROR");
    }

    // Extract just the time slots as an array of strings
    const bookedSlots = data.map((booking: any) => booking.time_slot);

    return createSuccessResponse(bookedSlots);
  } catch (error: any) {
    return createErrorResponse(error.message || "Internal Server Error");
  }
}
