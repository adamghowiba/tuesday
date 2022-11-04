import { SchemaRequestBody, SchemaResponseBody } from './utils/utils.types';

/* ------- LIST ------- */
export type ListResponseBody = SchemaResponseBody<'ItemsController_findAll'>;

/* ------- GET ------- */
export type GetResponseBody = SchemaResponseBody<'ItemsController_findOne'>;

/* ------- CREATE ------- */
export type CreateResponse = SchemaResponseBody<'ItemsController_create'>;
export type CreateData = SchemaRequestBody<'ItemsController_create'>;

/* ------- UPDATE ------- */
export type UpdateData = SchemaResponseBody<'ItemsController_update'>;
export type UpdateResponse = SchemaRequestBody<'ItemsController_update'>;

/* ------- DELETE ------- */
export type DeleteResponse = SchemaRequestBody<'ItemsController_remove'>;
