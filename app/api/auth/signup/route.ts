import { NextRequest } from "next/server";
import { AuthService } from "@/services/auth.service";
import { signupSchema } from "@/lib/validations/auth";
import { createErrorResponse, createSuccessResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate Input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return createErrorResponse(
        "Invalid input data",
        "VALIDATION_ERROR",
        400,
        validationResult.error.flatten().fieldErrors
      );
    }

    // 2. Call Service
    const user = await AuthService.signup(validationResult.data);

    // 3. Return Clean Response
    return createSuccessResponse(
      {
        id: user?.id,
        email: user?.email,
        createdAt: user?.created_at,
      },
      201 // Created
    );
  } catch (error: any) {
    console.error("[SIGNUP_ERROR]", error);

    // Handle known Supabase errors safely
    if (error?.status === 422 || error?.name === "AuthApiError") {
      return createErrorResponse(error.message, "AUTH_ERROR", 400);
    }

    // Generic error fallback to avoid leaking internals
    return createErrorResponse("An unexpected error occurred during signup", "INTERNAL_ERROR", 500);
  }
}
