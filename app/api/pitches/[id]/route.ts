import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { createSuccessResponse, createErrorResponse } from "@/types/api";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    // Check if ID is UUID or a slug
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    let query = supabase.from('pitches').select('*');
    
    if (isUuid) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }

    const { data: pitch, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return createErrorResponse("Pitch not found", "NOT_FOUND", 404);
      }
      return createErrorResponse(error.message, "DB_ERROR");
    }

    const mappedPitch = {
      id: pitch.id,
      name: pitch.name,
      slug: pitch.slug,
      location: {
        city: pitch.city,
        address: pitch.address,
        ...(pitch.lat && pitch.lng ? { coordinates: { lat: pitch.lat, lng: pitch.lng } } : {})
      },
      pricePerHour: pitch.price_per_hour,
      turfType: pitch.turf_type,
      rating: pitch.rating,
      reviews: pitch.reviews,
      images: pitch.images,
      videoUrl: pitch.video_url,
      amenities: pitch.amenities,
      description: pitch.description,
      openHours: pitch.open_hours
    };

    return createSuccessResponse(mappedPitch);
  } catch (error: any) {
    return createErrorResponse(error.message || "Internal Server Error");
  }
}
