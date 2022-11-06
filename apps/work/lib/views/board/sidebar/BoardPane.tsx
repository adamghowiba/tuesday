import add16Filled from '@iconify/icons-fluent/add-16-filled';
import filter16Filled from '@iconify/icons-fluent/filter-16-filled';
import iosArrowLtr24Filled from '@iconify/icons-fluent/ios-arrow-ltr-24-filled';
import search16Regular from '@iconify/icons-fluent/search-16-regular';
import { Icon } from '@iconify/react';
import { Button } from '@tuesday/ui';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useListBoards } from '../../../api/hooks/board/board.query';
import Divider from '../../../componenets/global/Divider';
import BoardModal from '../modals';
import BoardPaneBoards from './BoardPane-Boards';
import BoardPaneHeader from './BoardPane-Header';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoardSidebarProps {}

const BoardSidebar: FC<BoardSidebarProps> = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const boards = useListBoards();

  useEffect(() => {
    console.log(isCreateModalOpen);
  }, [isCreateModalOpen]);

  return (
    <>
      <div
        className={classNames('sidebar-container', isSidebarOpen && 'isOpen')}
      >
        <div className="sidebar">
          <BoardPaneHeader />

          <div className="main-actions">
            <Button
              buttonStyle="ghost"
              textAlign="left"
              fullWidth
              stopPropagation
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Icon icon={add16Filled} width={20} height={20} />
              Add
            </Button>
            <Button buttonStyle="ghost" textAlign="left" fullWidth>
              <Icon icon={filter16Filled} width={20} height={20} />
              Filters
            </Button>
            <Button buttonStyle="ghost" textAlign="left" fullWidth>
              <Icon icon={search16Regular} width={20} height={20} />
              Search
            </Button>
          </div>

          <Divider margin={'var(--space-medium) 0'} />

          <div className="boards">
            {boards.isSuccess && (
              <BoardPaneBoards
                boards={boards.data.map((board) => ({
                  key: crypto.randomUUID(),
                  name: board.name,
                  type: board.type,
                  folder: board?.folder?.name,
                  id: board.id
                }))}
              />
            )}
          </div>
        </div>

        <div
          className="control"
          onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
        >
          <div className="control__icon">
            <Icon icon={iosArrowLtr24Filled} width={14} height={14} />
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <BoardModal.Create onExit={() => setIsCreateModalOpen(false)} />
      )}

      <style jsx>{`
        .sidebar-container {
          position: relative;
          height: 100%;
          width: 40px;
          flex-shrink: 0;
          background-color: rgb(246, 247, 251);
          padding: var(--space-medium);

          .sidebar {
            display: none;
          }
        }

        .isOpen {
          width: 250px;

          .control {
            transform: rotate(0deg);
          }
          .sidebar {
            display: block;
          }
        }

        .sidebar {
        }

        .control {
          position: absolute;
          top: var(--space-xl);
          right: calc(var(--space-medium) * -1);
          width: 25px;
          height: 25px;
          border: 1px solid var(--color-wolf_gray);
          box-shadow: var(--box-shadow-xs);
          background-color: var(--color-snow_white);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100px;
          transition: width 0.15s linear, transform 0.2s ease;
          cursor: pointer;
          transform: rotate(180deg);

          &__icon {
            position: relative;
            left: 1px;
          }

          &:hover {
            background-color: var(--primary-color);
            color: var(--color-snow_white);
            width: 35px;
          }
        }

        header {
          display: flex;
          flex-direction: column;
          gap: var(--space-small);
          margin-bottom: var(--space-medium);
        }

        .workspace {
          display: flex;
          justify-content: space-between;
          align-items: center;

          &__title {
            font-size: var(--font-size-20);
          }
        }

        .main-actions {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

BoardSidebar.defaultProps = {};

export default BoardSidebar;
