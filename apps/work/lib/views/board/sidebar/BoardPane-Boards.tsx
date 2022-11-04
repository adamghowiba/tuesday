import { Icon, IconifyIcon } from '@iconify/react';
import { Button, Tree } from '@tuesday/ui';
import triangleDown12Filled from '@iconify/icons-fluent/triangle-down-12-filled';
import React, {
  FC,
  Key,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from 'react';
import documentBulletList20Regular from '@iconify/icons-fluent/document-bullet-list-20-regular';
import tableBottomRow16Regular from '@iconify/icons-fluent/table-bottom-row-16-regular';
import { BoardApi } from '@tuesday/types';

export interface BoardItem {
  key: Key;
  name: string;
  description?: string;
  folder?: string;
  type: BoardApi.GetResponseBody['type'];
}

interface FormattedBoards {
  folders: Record<string, BoardItem[]>;
  standalone: BoardItem[];
}

export interface BoardPaneBoardsProps {
  boards: BoardItem[];
}

const getBoardFolders = (board: BoardItem[]) => {
  return board.reduce(
    (acc: FormattedBoards, board) => {
      if (board.folder) {
        Array.isArray(acc.folders[board.folder])
          ? acc.folders[board.folder].push(board)
          : (acc.folders[board.folder] = [board]);
      } else {
        acc.standalone.push(board);
      }

      return acc;
    },
    { folders: {}, standalone: [] }
  );
};
const BoardPaneBoards: FC<BoardPaneBoardsProps> = (props) => {
  const formattedBoards = getBoardFolders(props.boards);

  useEffect(() => {
    console.log(Object.entries(formattedBoards.folders));
  }, []);

  return (
    <>
      <Tree
        treeData={Object.entries(formattedBoards.folders).map(([key, items]) => ({
          key,
          component: (
            <Button buttonStyle="ghost" fullWidth textAlign="left">
              <span>{key}</span>
            </Button>
          ),
          children: (
            <>
              {items.map((board) => (
                <BoardButton key={board.key} type={board.type}>
                  {board.name}
                </BoardButton>
              ))}
            </>
          ),
        }))}
      />

      {formattedBoards.standalone.map((board) => (
        <BoardButton key={board.key} type={board.type}>
          {board.name}
        </BoardButton>
      ))}
      <style jsx>{``}</style>
    </>
  );
};

interface BoardButtonProps extends PropsWithChildren {
  type: BoardItem['type'];
}

const BoardButton: FC<BoardButtonProps> = ({ ...props }) => {
  const BOARD_ICON: Record<BoardItem['type'], IconifyIcon> = {
    DOCUMENT: documentBulletList20Regular,
    ITEM_BOARD: tableBottomRow16Regular,
  };

  return (
    <>
      <Button
        buttonStyle="ghost"
        fullWidth
        textAlign="left"
        gap="var(--space-small)"
      >
        <Icon icon={BOARD_ICON[props.type]} width={18} height={18} />
        <span>{props.children}</span>
      </Button>
      <style jsx>{``}</style>
    </>
  );
};

BoardPaneBoards.defaultProps = {};

export default BoardPaneBoards;
