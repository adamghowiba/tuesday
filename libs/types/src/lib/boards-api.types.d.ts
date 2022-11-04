import { SchemaRequestBody, SchemaResponseBody } from './utils/utils.types';

/* ------- LIST ------- */
export type ListResponseBody = SchemaResponseBody<'BoardsController_findAll'>;

/* ------- GET ------- */
export type GetResponseBody = SchemaResponseBody<'BoardsController_findOne'>;

/* ------- CREATE ------- */
export type CreateResponse = SchemaResponseBody<'BoardsController_create'>;
export type CreateData = SchemaRequestBody<'BoardsController_create'>;

/* ------- UPDATE ------- */
export type UpdateData = SchemaResponseBody<'BoardsController_update'>;
export type UpdateResponse = SchemaRequestBody<'BoardsController_update'>;

/* ------- DELETE ------- */
export type DeleteResponse = SchemaRequestBody<'BoardsController_remove'>;
