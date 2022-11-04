import { SchemaRequestBody, SchemaResponseBody } from './utils/utils.types';

/* ------- LIST ------- */
export type ListResponseBody = SchemaResponseBody<'ColumnsController_findAll'>;

/* ------- GET ------- */
export type GetResponseBody = SchemaResponseBody<'ColumnsController_findOne'>;

/* ------- CREATE ------- */
export type CreateResponse = SchemaResponseBody<'ColumnsController_create'>;
export type CreateData = SchemaRequestBody<'ColumnsController_create'>;

/* ------- UPDATE ------- */
export type UpdateData = SchemaResponseBody<'ColumnsController_update'>;
export type UpdateResponse = SchemaRequestBody<'ColumnsController_update'>;

/* ------- DELETE ------- */
export type DeleteResponse = SchemaRequestBody<'ColumnsController_remove'>;
