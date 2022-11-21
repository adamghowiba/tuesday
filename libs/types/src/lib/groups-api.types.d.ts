import { SchemaCreateResponseBody, SchemaRequestBody, SchemaResponseBody } from './utils/utils.types';

/* ------- LIST ------- */
export type ListResponseBody = SchemaResponseBody<'GroupsController_list'>;

/* ------- GET ------- */
export type RetriveResponseBody = SchemaResponseBody<'GroupsController_retrive'>;

/* ------- CREATE ------- */
export type CreateResponse = SchemaCreateResponseBody<'GroupsController_create'>;
export type CreateData = SchemaRequestBody<'GroupsController_create'>;

/* ------- UPDATE ------- */
export type UpdateData = SchemaResponseBody<'GroupsController_update'>;
export type UpdateResponse = SchemaRequestBody<'GroupsController_update'>;

/* ------- DELETE ------- */
export type DeleteResponse = SchemaRequestBody<'GroupsController_remove'>;
