import { ItemApi } from '@tuesday/types';
import {
  useAddColumnMutation,
  useAddItemMutation,
} from '../../lib/api/hooks/board/board.mutate';
import { useRouter } from 'next/router';
import { api } from '../../lib/api/api';
import { useRetriveBoard } from '../../lib/api/hooks/board/board.query';
import BoardTable from '../../lib/componenets/tabel/board-table/BoardTable';
import {
  BoardColumn,
  ColumnChangeParams,
} from '../../lib/componenets/tabel/BoardTableT';
import BoardHeader from '../../lib/views/board/BoardHeader';
import BoardHeaderSettings from '../../lib/views/board/BoardHeader-Settings';
import BoardSidebar from '../../lib/views/board/sidebar/BoardPane';
import { ColumnType } from '@prisma/client';

interface Item {
  id: number;
  name: string;
  column_values: Record<number, any>;
}

const Boards = () => {
  const { boardId } = useRouter().query;
  const boardQuery = useRetriveBoard({ boardId: +boardId });

  const addColumnMuation = useAddColumnMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      console.log(response);
      boardQuery.refetch();
    },
  });

  const addItemsMutation = useAddItemMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      console.log(response);
      boardQuery.refetch();
    },
  });

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

  const getFormatedItems = (items: ItemApi.ListResponseBody) => {
    return items.map((item) => ({ name: item.name, ...item.column_values }));
  };

  const handleCellChange = async (params: ColumnChangeParams) => {
    const { column, value, row } = params;

    const response = await api.items.update(+row.id, {
      column_values: { [column.key]: value },
    });

    console.log(response);
  };

  const handleAddItem = (itemName: string) => {
    addItemsMutation.mutate({ board_id: +boardId, name: itemName });
  };

  const handleAddColumn = (type: ColumnType) => {
    addColumnMuation.mutate({ boardId: +boardId, title: type, type: type });
  };

  /* Temp Loading State */
  if (boardQuery.isLoading || boardQuery.isIdle) return <h2>Loading...</h2>;

  return (
    <>
      <div className="page-container">
        <BoardSidebar />

        <div className="board-container">
          <div className="board-header">
            <BoardHeader title={boardQuery.data.name} />
            <BoardHeaderSettings />
          </div>

          {boardQuery.data.columns && (
            <BoardTable
              columns={columnsToDataColumns(boardQuery.data.columns)}
              rows={[{id: 1, 1: 'Adam', 2: "wild", name: "Okay"}]}
              onCellEdit={handleCellChange}
              onAddColumn={handleAddColumn}
              onAddItem={handleAddItem}
              color="var(--primary-color)"
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .page-container {
          display: flex;
          height: 100%;
        }

        .board-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
          width: 100%;
          overflow-y: visible;
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
