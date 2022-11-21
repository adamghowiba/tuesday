import type { operations } from '../schema';

/**Shortcut to get Swagger schema response body */
export type SchemaResponseBody<T extends keyof operations> =
operations[T]['responses']['200']['content']['application/json'];

/** Shortcut to get Swagger created(201) response body */
export type SchemaCreateResponseBody<T extends keyof operations> =
  operations[T]['responses']['201']['content']['application/json'];

export type SchemaRequestBody<T extends keyof operations> =
  operations[T]['requestBody']['content']['application/json'];
