import { Button } from '@tuesday/ui';
import FavoritesIcon from '../../lib/componenets/icons/FavoritesIcon';
import BoardHeader from '../../lib/views/board/BoardHeader';
import React, { useState, useEffect, useMemo } from 'react';
import BoardTableT, {
  BoardColumn,
} from '../../lib/componenets/tabel/BoardTableT';
import BoardHeaderSettings from 'apps/work/lib/views/board/BoardHeader-Settings';
import { MOCK_BOARD } from 'apps/work/lib/mock/board.mock';

// const ROWS = [
//   {
//     item: 'Add dawdad awdaw awd awdaw daw d ns',
//     status: 'active',
//     person: 'Adam',
//     date: '10/20',
//   },
//   { item: 'Add buttons', status: 'active', date: '10/20', person: 'Adam' },
// ];

const Boards = () => {
  const BOARD_COLUMNS: BoardColumn[] = useMemo(
    () => [{ headerName: 'Item', key: 'item', width: 150, sticky: true }],
    []
  );
  const [columns, setColumns] = useState<BoardColumn[]>(BOARD_COLUMNS);

    const fetchColumns = () => {
      const columns = MOCK_BOARD.columns;
    }

  useEffect(() => {
    setColumns(BOARD_COLUMNS);
  }, [BOARD_COLUMNS]);

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      {
        key: `${Math.floor(Math.random() * 1000)}`,
        headerName: 'Wild',
        width: 140,
      },
    ]);
  };

  return (
    <>
      <div className="board-container">
        <div className="board-header">
          <BoardHeader title="Web Revived Back Office" />
          <BoardHeaderSettings />
        </div>

        <BoardTableT
          columns={columns}
          rows={ROWS}
          onClickAdd={handleAddColumn}
        />
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
