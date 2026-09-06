import { createSuccessResponse } from "@/types/api";

export async function GET() {
  return createSuccessResponse({ status: "ok" });
}
