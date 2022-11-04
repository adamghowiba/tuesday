import { ItemApi } from '@tuesday/types';
import { Request } from '../request';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ItemListParams {}

export class Items {
  constructor(private request: Request) {}

  async list(params?: ItemListParams) {
    const response = await this.request.get('/items');

    return response.data;
  }

  async retrive(itemId: number) {
    const response = await this.request.get(`/items/${itemId}`);

    return response;
  }

  async create(itemId: number, data: ItemApi.CreateData) {
    const response = await this.request.post(`/boards/${itemId}/items`, data);

    return response;
  }

  async update(itemId: number, data: ItemApi.UpdateResponse) {
    const response = await this.request.patch(`/items/${itemId}`, data);

    return response;
  }

  async delete(itemId: number) {
    const response = await this.request.delete(`/items/${itemId}`);

    return response;
  }
}
