import React, { FC, useState } from 'react';
import IconAction from '../../../componenets/global/IconAction';
import iosArrowLtr24Filled from '@iconify/icons-fluent/ios-arrow-ltr-24-filled';
import { Icon } from '@iconify/react';
import classNames from 'classnames';
import { Button, Tree } from '@tuesday/ui';
import add16Filled from '@iconify/icons-fluent/add-16-filled';
import filter16Filled from '@iconify/icons-fluent/filter-16-filled';
import search16Regular from '@iconify/icons-fluent/search-16-regular';
import settings16Regular from '@iconify/icons-fluent/settings-16-regular';
import Divider from '../../../componenets/global/Divider';
import BoardPaneBoards from './BoardPane-Boards';
import { useListBoards } from '../../../api/hooks/board/fetchBoard';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoardSidebarProps {}

const BoardSidebar: FC<BoardSidebarProps> = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const boards = useListBoards();

  return (
    <>
      <div
        className={classNames('sidebar-container', isSidebarOpen && 'isOpen')}
      >
        <div className="sidebar">
          <header>
            <div className="workspace">
              <span className="workspace__title">Workspace</span>
              <Icon icon={settings16Regular} width={20} height={20} />
            </div>
          </header>

          <div className="main-actions">
            <Button buttonStyle="ghost" textAlign="left" fullWidth>
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
                  key: board.id,
                  name: board.name,
                  type: board.type,
                  folder: board?.folder?.name,
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

      <style jsx>{`
        .sidebar-container {
          position: relative;
          height: 100%;
          width: 40px;
          background-color: rgb(246, 247, 251);
          padding: var(--space-medium);

          &.isOpen {
            width: 254px;
          }

          &.isOpen .sidebar {
            display: block;
          }

          .sidebar {
            display: none;
          }
        }

        .sidebar {
        }

        .control {
          position: absolute;
          right: 0;
          top: 0;
          width: 25px;
          height: 25px;
          border: 1px solid var(--color-wolf_gray);
          transform: translate(50%, 80%);
          box-shadow: var(--box-shadow-xs);
          background-color: var(--color-snow_white);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;

          &__icon {
            position: relative;
            left: 1px;
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
