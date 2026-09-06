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

// --- Pagination ---

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationMeta;
}

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

// Helper to standardise paginated success responses
export function createPaginatedResponse<T>(
  items: T[],
  pagination: PaginationMeta,
  status: number = 200
) {
  return Response.json(
    {
      success: true,
      data: { items, pagination },
    },
    { status }
  );
}
