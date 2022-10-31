import { useRouter } from 'next/router';
import { Suspense, useEffect } from 'react';
import { useQuery } from 'react-query';
import { request } from '../../lib/api/api';
import BoardHeader from '../../lib/views/board/BoardHeader';
import BoardHeaderSettings from '../../lib/views/board/BoardHeader-Settings';

const useFetchBoard = (params: { boardId: number }) => {
  const boardQuery = useQuery(
    ['boards', params.boardId],
    async () => {
      const response = await request.get(`/boards/${params.boardId}`);

      return response.data;
    },
    { enabled: !!params.boardId }
  );

  return boardQuery;
};

const Boards = () => {
  const { boardId } = useRouter().query;
  const boardQuery = useFetchBoard({ boardId: +boardId });


  /* Temp Loading State */
  if (boardQuery.isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div className="board-container">
        <div className="board-header">
          <BoardHeader title={boardQuery.data.name} />
          <BoardHeaderSettings />
        </div>

        {/* <BoardTableT columns={boardQuery.data.columns} rows={boardQuery.data.row} /> */}
      </div>

      <style jsx>{`
        .board-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
          overflow: auto;
          width: calc(100vw - 70px);
          padding: var(--space-large);
        }

        .buttons {
          margin: 1rem;
          display: flex;
          gap: 1rem;
        }

        .board-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default Boards;
