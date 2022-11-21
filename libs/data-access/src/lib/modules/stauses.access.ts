import { StatusApi } from '@tuesday/types';
import { Request } from '../request';

export class Statuses {
  constructor(private request: Request) {}

  async updateMany(data: StatusApi.UpdateBatchData) {
    const response = await this.request.patch(`/statuses/batch`, data);

    return response;
  }


}
