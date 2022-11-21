import { GroupsApi } from '@tuesday/types';
import { Request } from '../request';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GroupListParams {boardId: number}

export class Groups {
  constructor(private request: Request) {}

  async list(params: GroupListParams) {
    const response = await this.request.get<GroupsApi.ListResponseBody>(
      `/boards/${params.boardId}/groups`
    );

    return response;
  }

  async retrive(groupId: number) {
    const response = await this.request.get<GroupsApi.RetriveResponseBody>(
      `/groups/${groupId}`
    );

    return response;
  }

  async create(boardId: number, data: GroupsApi.CreateData) {
    const response = await this.request.post<GroupsApi.CreateResponse>(
      `/boards/${boardId}/groups`,
      data
    );

    return response;
  }

  async update(groupId: number, data: GroupsApi.UpdateResponse) {
    const response = await this.request.patch<GroupsApi.UpdateResponse>(
      `/groups/${groupId}`,
      data
    );

    return response;
  }

  async delete(groupId: number) {
    const response = await this.request.delete<GroupsApi.DeleteResponse>(
      `/groups/${groupId}`
    );

    return response;
  }
}
