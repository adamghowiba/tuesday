import { BoardApi } from '@tuesday/types';
import { Request } from '../request';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoardListParams {}

export class Board {
  constructor(private request: Request) {}

  async list(params?: BoardListParams) {
    const response = await this.request.get<BoardApi.ListResponseBody>(
      '/boards'
    );

    return response;
  }

  async retrive(boardId: number) {
    const response = await this.request.get<BoardApi.GetResponseBody>(
      `/boards/${boardId}`
    );

    return response;
  }

  async create(data: BoardApi.CreateData) {
    const response = await this.request.post<BoardApi.CreateResponse>(
      '/boards',
      data
    );

    return response;
  }

  async update(boardId: number, data: BoardApi.UpdateResponse) {
    const response = await this.request.patch<BoardApi.UpdateResponse>(
      `/boards/${boardId}`,
      data
    );

    return response;
  }

  async delete(boardId: number) {
    const response = await this.request.delete<BoardApi.DeleteResponse>(
      `/boards/${boardId}`
    );

    return response;
  }
}
