import { BoardApi, ColumnApi, ItemApi } from '@tuesday/types';
import { useMutation, UseMutationOptions } from 'react-query';
import { api } from '../../api';
import { MutationParams } from './api-hook.type';

export const useCreateBoardMutation = (
  params?: MutationParams<BoardApi.CreateResponse>
) => {
  const createBoard = async (data: BoardApi.CreateData) => {
    const response = await api.board.create(data);

    return response.data;
  };

  const createBoardMutation = useMutation(createBoard, {
    onSuccess: params?.onSuccess,
    onError: params?.onError,
    onSettled: params?.onSettled,
  });

  return createBoardMutation;
};

export const useAddColumnMutation = (
  params: MutationParams<BoardApi.CreateResponse>
) => {
  const addColumn = async ({
    boardId,
    ...data
  }: ColumnApi.CreateData & { boardId: number }) => {
    const response = await api.columns.create(+boardId, data);

    return response;
  };

  const mutation = useMutation(addColumn, {
    onSuccess: params.onSuccess,
    onError: params.onError,
    onSettled: params.onSettled,
  });

  return mutation;
};

export const useAddItemMutation = (
  params?: MutationParams<BoardApi.CreateResponse>
) => {
  const addColumn = async ({ ...data }: ItemApi.CreateData) => {
    const response = await api.items.create(+data.board_id, data);

    return response;
  };

  const mutation = useMutation(addColumn, {
    onSuccess: params?.onSuccess,
    onError: params?.onError,
    onSettled: params?.onSettled,
  });

  return mutation;
};
