export type Prettify<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;
export type Dictionary<T = unknown> = Record<string, T>;
export type PrimitiveValue = string | number | boolean;
export type PrimitiveValueAsArray = string[] | number[] | boolean[];
export type ParsedQs = {
  [key: string]: undefined | PrimitiveValue | PrimitiveValueAsArray | ParsedQs | ParsedQs[];
};

export type DropUndefined<T> = T extends undefined | null ? never : T;
export type PropertyOf<T, K extends keyof DropUndefined<T>> = T extends undefined ? never : DropUndefined<T>[K];

export type Pagination = {
  page: number;
  perPage: number;
  pages: number;
  from: number;
  to: number;
  prevUrl: string;
  nextUrl: string;
};
export type PaginatedResponse<T> = Prettify<Pagination & { data: T }>;
