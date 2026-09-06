import { createClient } from "@/utils/supabase/server";
import { createSuccessResponse, createErrorResponse } from "@/types/api";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    let query = supabase.from('pitches').select('*');

    if (city && city !== 'any') {
      query = query.ilike('city', `%${city}%`);
    }

    const { data, error } = await query;

    if (error) {
      return createErrorResponse(error.message, "DB_ERROR");
    }

    const mappedPitches = data.map((pitch: any) => ({
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
    }));

    return createSuccessResponse(mappedPitches);
  } catch (error: any) {
    return createErrorResponse(error.message || "Internal Server Error");
  }
}
