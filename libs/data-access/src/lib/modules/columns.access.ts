import { ColumnApi } from '@tuesday/types';
import { Request } from '../request';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ColumnListParams {}

export class Columns {
  constructor(private request: Request) {}

  async list(params?: ColumnListParams) {
    const response = await this.request.get('/columns');

    return response.data;
  }

  async retrive(boardId: number) {
    const response = await this.request.get(`/columns/${boardId}`);

    return response;
  }

  async create(boardId: number, data: ColumnApi.CreateData) {
    const response = await this.request.post(`/boards/${boardId}/columns`, data);

    return response;
  }

  async update(boardId: number, data: ColumnApi.UpdateResponse) {
    const response = await this.request.patch(`/columns/${boardId}`, data);

    return response;
  }

  async delete(boardId: number) {
    const response = await this.request.delete(`/columns/${boardId}`);

    return response;
  }
}
