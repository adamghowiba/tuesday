import { ColumnType } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { api } from '../../lib/api/api';
import BoardTableT, {
  BoardColumn,
  ColumnChangeParams,
} from '../../lib/componenets/tabel/BoardTableT';
import BoardHeader from '../../lib/views/board/BoardHeader';
import BoardHeaderSettings from '../../lib/views/board/BoardHeader-Settings';

interface Item {
  id: number;
  name: string;
  column_values: Record<number, any>;
}

const useFetchBoard = (params: { boardId: number }) => {
  const boardQuery = useQuery(
    ['boards', params.boardId],
    async () => (await api.board.retrive(params.boardId)).data,
    { enabled: !!params.boardId }
  );

  return boardQuery;
};

const Boards = () => {
  const { boardId } = useRouter().query;
  const boardQuery = useFetchBoard({ boardId: +boardId });

  const DEFAULT_COLUMNS: BoardColumn[] = [
    { key: 'name', headerName: 'Item', width: 140 },
  ];

  const columnsToDataColumns = (columns: any[]): BoardColumn[] => {
    const trasnformedColumns = columns.map((column) => ({
      key: column.id,
      width: 140,
      headerName: column.title,
    }));

    return [...DEFAULT_COLUMNS, ...trasnformedColumns];
  };

  const getFormatedItems = (items: Item[]) => {
    return items.map((item) => ({ name: item.name, ...item.column_values }));
  };

  const handleCellChange = async (params: ColumnChangeParams) => {
    const { column, rowIndex, value } = params;
    const row = boardQuery.data.items[rowIndex];

    const response = await api.items.update(row.id, {
      column_values: { [column.key]: value },
    });

    console.log(response.data);
  };

  const addColumnMutation = useMutation(
    async (params: { type: ColumnType }) => {
      const response = await api.columns.create(+boardId, {
        title: params.type,
        type: params.type,
      });

      return response;
    },
    {
      onSuccess: () => {
        console.log('Success');
        boardQuery.refetch();
      },
    }
  );

  /* Temp Loading State */
  if (boardQuery.isLoading || boardQuery.isIdle) return <h2>Loading...</h2>;

  return (
    <>
      <div className="board-container">
        <div className="board-header">
          <BoardHeader title={boardQuery.data.name} />
          <BoardHeaderSettings />
        </div>

        {boardQuery.data.columns && (
          <BoardTableT
            columns={columnsToDataColumns(boardQuery.data.columns)}
            rows={getFormatedItems(boardQuery.data.items)}
            onCellChange={handleCellChange}
            onAddColumn={(type: ColumnType) =>
              addColumnMutation.mutate({ type })
            }
          />
        )}
      </div>

      <style jsx>{`
        .wrapper {
          position: relative;
          overflow-x: auto;
        }
        .board-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
          overflow-y: visible;
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
