import { Pitch } from "@/types/pitch";
import { ApiResponse, PaginatedData } from "@/types/api";

export const pitchesService = {
  async getAll(options?: {
    city?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedData<Pitch>> {
    const params = new URLSearchParams();
    if (options?.city && options.city !== "any") params.set("city", options.city);
    if (options?.page) params.set("page", String(options.page));
    if (options?.pageSize) params.set("pageSize", String(options.pageSize));

    const query = params.toString() ? `?${params.toString()}` : "";
    const response = await fetch(`/api/pitches${query}`, {
      cache: "no-store",
    });
    const result: ApiResponse<PaginatedData<Pitch>> = await response.json();
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return result.data;
  },

  async getById(idOrSlug: string): Promise<Pitch> {
    const response = await fetch(`/api/pitches/${idOrSlug}`, {
      cache: "no-store",
    });
    const result: ApiResponse<Pitch> = await response.json();
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return result.data;
  },
};
