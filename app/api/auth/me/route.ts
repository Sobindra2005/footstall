import { NextRequest } from "next/server";
import { AuthService } from "@/services/auth.service";
import { createErrorResponse, createSuccessResponse } from "@/types/api";

export async function GET(req: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser();

    if (!user) {
      return createErrorResponse("Unauthorized", "UNAUTHORIZED", 401);
    }

    // Return safe user information
    return createSuccessResponse({
      id: user.id,
      email: user.email,
      lastSignInAt: user.last_sign_in_at,
    });
  } catch (error: any) {
    console.error("[ME_ERROR]", error);
    return createErrorResponse("An unexpected error occurred", "INTERNAL_ERROR", 500);
  }
}
