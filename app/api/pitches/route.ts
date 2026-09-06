import { createClient } from "@/utils/supabase/server";
import { createPaginatedResponse, createErrorResponse } from "@/types/api";

const DEFAULT_PAGE_SIZE = 12;

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const pageSize = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE), 10))
    );

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("pitches")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (city && city !== "any") {
      query = query.ilike("city", `%${city}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return createErrorResponse(error.message, "DB_ERROR");
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / pageSize);

    const mappedPitches = (data ?? []).map((pitch: any) => ({
      id: pitch.id,
      name: pitch.name,
      slug: pitch.slug,
      location: {
        city: pitch.city,
        address: pitch.address,
        ...(pitch.lat && pitch.lng
          ? { coordinates: { lat: pitch.lat, lng: pitch.lng } }
          : {}),
      },
      pricePerHour: pitch.price_per_hour,
      turfType: pitch.turf_type,
      rating: pitch.rating,
      reviews: pitch.reviews,
      images: pitch.images ?? [],
      videoUrl: pitch.video_url,
      amenities: pitch.amenities ?? [],
      description: pitch.description,
      openHours: pitch.open_hours,
    }));

    return createPaginatedResponse(mappedPitches, {
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (error: any) {
    return createErrorResponse(error.message || "Internal Server Error");
  }
}
