import { NextRequest } from "next/server";
import { AuthService } from "@/services/auth.service";
import { createErrorResponse, createSuccessResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  try {
    await AuthService.logout();
    return createSuccessResponse({ success: true });
  } catch (error: any) {
    console.error("[LOGOUT_ERROR]", error);
    return createErrorResponse("Failed to log out", "LOGOUT_ERROR", 500);
  }
}
