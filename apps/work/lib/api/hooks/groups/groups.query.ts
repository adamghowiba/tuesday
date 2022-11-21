import { GroupsApi } from '@tuesday/types';
import { useMutation } from 'react-query';
import { api } from '../../api';
import { MutationParams } from '../api-hook.type';

export const useCreateGroupMutation = (
  params?: MutationParams<GroupsApi.CreateResponse>
) => {
  const createGroup = ({
    boardId,
    ...data
  }: GroupsApi.CreateData & { boardId: number }) => {
    return api.groups.create(boardId, data);
  };

  const mutation = useMutation(createGroup, params);

  return mutation;
};

export const useUpdateGroupMutation = (
  params?: MutationParams<GroupsApi.UpdateData>
) => {
  const updateGroup = ({
    groupId,
    ...data
  }: GroupsApi.UpdateData & { groupId: number }) => {
    return api.groups.update(groupId, data);
  };

  const mutation = useMutation(updateGroup, params);

  return mutation;
};

export const useDeleteGroupMutation = (
  params?: MutationParams<GroupsApi.CreateResponse>
) => {
  const deleteGroup = ({ groupId }: { groupId: number }) => {
    return api.groups.delete(groupId);
  };

  const mutation = useMutation(deleteGroup, params);

  return mutation;
};
