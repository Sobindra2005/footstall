import { createClient } from "@/utils/supabase/server";
import { createErrorResponse, createSuccessResponse } from "@/types/api";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return createErrorResponse("You must be logged in to book a pitch.", "UNAUTHORIZED", 401);
    }

    const body = await request.json();
    const { pitchId, bookingDate, timeSlot, totalPrice, customerName } = body;

    // Validate payload
    if (!pitchId || !bookingDate || !timeSlot || !totalPrice || !customerName) {
      return createErrorResponse("Missing required fields for booking.", "BAD_REQUEST", 400);
    }

    // Resolve Pitch ID if it's a slug
    let resolvedPitchId = pitchId;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pitchId);
    
    if (!isUuid) {
      const { data: pitchInfo } = await supabase
        .from("pitches")
        .select("id")
        .eq("slug", pitchId)
        .single();
        
      if (!pitchInfo) {
        return createErrorResponse("Pitch not found.", "NOT_FOUND", 404);
      }
      resolvedPitchId = pitchInfo.id;
    }

    // Attempt to insert the booking
    // Note: This relies on the UNIQUE(pitch_id, booking_date, time_slot) constraint in the database
    // to prevent double bookings. If it fails due to constraint, it means it's already booked.
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        pitch_id: resolvedPitchId,
        booking_date: bookingDate,
        time_slot: timeSlot,
        total_price: totalPrice,
        customer_name: customerName,
        status: "pending", 
      })
      .select()
      .single();

    if (insertError) {
      // Check if it's a unique constraint violation (code 23505 in Postgres)
      if (insertError.code === '23505') {
        return createErrorResponse("This time slot has already been booked. Please select another time.", "CONFLICT", 409);
      }
      return createErrorResponse(insertError.message, "DB_ERROR");
    }

    return createSuccessResponse(booking, 201);
  } catch (error: any) {
    return createErrorResponse(error.message || "Internal Server Error");
  }
}
