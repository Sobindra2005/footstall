import { NextRequest } from "next/server";
import { AuthService } from "@/services/auth.service";
import { loginSchema } from "@/lib/validations/auth";
import { createErrorResponse, createSuccessResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate Input
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return createErrorResponse(
        "Invalid input data",
        "VALIDATION_ERROR",
        400,
        validationResult.error.flatten().fieldErrors
      );
    }

    // 2. Call Service
    const user = await AuthService.login(validationResult.data);

    // 3. Return Clean Response
    return createSuccessResponse({
      id: user?.id,
      email: user?.email,
    });
  } catch (error: any) {
    console.error("[LOGIN_ERROR]", error);

    // Supabase AuthApiError usually means invalid credentials
    if (error?.name === "AuthApiError") {
      return createErrorResponse("Invalid email or password", "INVALID_CREDENTIALS", 401);
    }

    // Generic fallback
    return createErrorResponse("An unexpected error occurred during login", "INTERNAL_ERROR", 500);
  }
}
