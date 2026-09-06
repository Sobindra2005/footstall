import { Pitch } from "@/types/pitch";
import { ApiResponse } from "@/types/api";

export const pitchesService = {
  async getAll(city?: string): Promise<Pitch[]> {
    const url = `/api/pitches${city && city !== "any" ? `?city=${city}` : ""}`;
    const response = await fetch(url, {
      next: { revalidate: 60 } // optional revalidation or cache config
    });
    const result: ApiResponse<Pitch[]> = await response.json();
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return result.data;
  },

  async getById(idOrSlug: string): Promise<Pitch> {
    const response = await fetch(`/api/pitches/${idOrSlug}`);
    const result: ApiResponse<Pitch> = await response.json();
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return result.data;
  },
};
