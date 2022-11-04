import { QUERY_KEY } from 'apps/work/lib/constants/query-key.constant';
import { useQuery } from 'react-query';
import { api } from '../../api';

export const useListBoards = () => {
  const boardsQuery = useQuery(QUERY_KEY.listBoards, async () => {
    const response = await api.board.list();

    return response.data;
  });

  return boardsQuery;
};

export const useRetriveBoard = ({ boardId }: { boardId: number }) => {
  const boardQuery = useQuery(QUERY_KEY.retriveBoard({ boardId }), async () => {
    const response = await api.board.retrive(boardId);

    return response.data;
  });

  return boardQuery;
};
