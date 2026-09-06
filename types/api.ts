export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// Helper to standardise error responses
export function createErrorResponse(message: string, code: string = 'INTERNAL_ERROR', status: number = 500, details?: any) {
  return Response.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}

// Helper to standardise success responses
export function createSuccessResponse<T>(data: T, status: number = 200) {
  return Response.json(
    {
      success: true,
      data,
    },
    { status }
  );
}
