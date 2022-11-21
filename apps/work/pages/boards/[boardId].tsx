import { ColumnType } from '@prisma/client';
import { ColumnApi, ItemApi } from '@tuesday/types';
import {
  ColumnChangeParams,
  ColumnDeleteParams,
} from '../../lib/componenets/tabel/board-table/header/BoardTableHeader';
import { useRouter } from 'next/router';
import { api } from '../../lib/api/api';
import {
  useAddColumnMutation,
  useAddItemMutation,
} from '../../lib/api/hooks/board/board.mutate';
import { useRetriveBoard } from '../../lib/api/hooks/board/board.query';
import BoardTable, {
  BoardColumn,
  CellEditParams,
} from '../../lib/componenets/tabel/board-table/BoardTable';
import BoardHeader from '../../lib/views/board/BoardHeader';
import BoardHeaderSettings from '../../lib/views/board/BoardHeader-Settings';
import BoardSidebar from '../../lib/views/board/sidebar/BoardPane';
import { Button } from '@tuesday/ui';
import { createContext } from 'react';
import { BoardGroupHeaderProps } from '../../lib/componenets/tabel/board-table/group/BoardGroupHeader';
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
} from '../../lib/api/hooks/groups/groups.query';

interface BoardContext {
  boardId: number;
  groupId: number;
  color: string;
}

export const BoardContext = createContext<BoardContext>(null);

const Boards = () => {
  const { boardId } = useRouter().query;
  const boardQuery = useRetriveBoard({ boardId: +boardId });

  const addColumnMuation = useAddColumnMutation({
    onError: console.error,
    onSuccess: (response) => {
      boardQuery.refetch();
    },
  });

  const addItemsMutation = useAddItemMutation({
    onError: console.error,
    onSuccess: (response) => {
      boardQuery.refetch();
    },
  });

  const deleteGroupsMutation = useDeleteGroupMutation({
    onError: console.error,
    onSuccess: () => boardQuery.refetch(),
  });

  const createGroupMutation = useCreateGroupMutation({
    onError: console.error,
    onSuccess: () => boardQuery.refetch(),
  });

  const DEFAULT_COLUMNS: BoardColumn[] = [
    { key: 'name', headerName: 'Item', width: 140, editable: true },
  ];

  const columnsToDataColumns = (
    columns: ColumnApi.ListResponseBody
  ): BoardColumn[] => {
    const trasnformedColumns: BoardColumn[] = columns.map((column) => ({
      key: column.id,
      width: 140,
      editable: true,
      type: ColumnType[column.type],
      headerName: column.title,
    }));

    return [...DEFAULT_COLUMNS, ...trasnformedColumns];
  };

  const getFormatedItems = (items: ItemApi.ListResponseBody) => {
    if (!items?.length) return [];

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      ...item.column_values,
    }));
  };

  const handleAddItem = (params: { item: string; groupId: number }) => {
    addItemsMutation.mutate({
      board_id: +boardId,
      name: params.item,
      group_id: params.groupId,
    });
  };

  /* TODO: Turn into mutation */
  const handleCellEdit = async (params: CellEditParams) => {
    const { column, value, row } = params;

    const response = await api.items.update(+row.id, {
      column_values: { [column.key]: value },
    });

    boardQuery.refetch();
    return response;
  };

  /* COLUMN EVENTS */
  const handleAddColumn = (type: ColumnType) => {
    addColumnMuation.mutate({ boardId: +boardId, title: type, type: type });
  };

  const handleColumnDelete = async (params: ColumnDeleteParams) => {
    try {
      await api.columns.delete(params.columnId);
      boardQuery.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleColumnChange = async (params: ColumnChangeParams) => {
    try {
      await api.columns.update(params.id as string, {
        title: params.value as string,
      });
      boardQuery.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  /* GROUP EVENTS */
  const handleAddNewGroup = async () => {
    const groupTitle = boardQuery.data.groups.length
      ? `Group #${boardQuery.data.groups.length}`
      : 'New Group';

    createGroupMutation.mutate({
      boardId: +boardId,
      color: 'red',
      title: groupTitle,
    });
  };

  const handleDeleteGroup: BoardGroupHeaderProps['onDelete'] = async (
    groupId
  ) => {
    deleteGroupsMutation.mutate({ groupId: groupId });
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

          <div className="board-groups">
            {boardQuery.data.groups &&
              boardQuery.data.groups.map((group) => (
                <BoardContext.Provider
                  value={{
                    boardId: +boardId,
                    groupId: group.id,
                    color: group.color,
                  }}
                  key={group.id}
                >
                  <BoardTable
                    key={group.id}
                    title={group.title}
                    columns={columnsToDataColumns(boardQuery.data.columns)}
                    rows={getFormatedItems(group.items)}
                    statusList={boardQuery.data.statuses}
                    color="var(--primary-color)"
                    groupId={group.id}
                    onCellEdit={handleCellEdit}
                    onAddItem={(item) =>
                      handleAddItem({ item, groupId: group.id })
                    }
                    onClickStatus={(params) => console.log(params)}
                    onAddColumn={handleAddColumn}
                    onColumnChange={handleColumnChange}
                    onDeleteColumn={handleColumnDelete}
                    onDeleteGroup={handleDeleteGroup}
                  />
                </BoardContext.Provider>
              ))}
          </div>

          <Button onClick={handleAddNewGroup}>Add new group</Button>
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

        .board-groups {
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
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
