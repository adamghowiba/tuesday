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
  id: number;
  type: BoardApi.GetResponseBody['type'];
}

interface FormattedBoards {
  folders: Record<string, BoardItem[]>;
  standalone: BoardItem[];
}

export interface BoardPaneBoardsProps {
  boards: BoardItem[];
}

const getBoards = (board: BoardItem[]) => {
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
  const formattedBoards = getBoards(props.boards);

  useEffect(() => {
    console.log(formattedBoards);
  }, []);

  return (
    <>
      <Tree
        treeData={Object.entries(formattedBoards.folders).map(
          ([key, boardItems]) => ({
            key: crypto.randomUUID(),
            component: (params) => (
              <Button buttonStyle="ghost" fullWidth textAlign="left">
                <Icon
                  icon={triangleDown12Filled}
                  width={11}
                  height={11}
                  rotate={params.isOpen ? 0 : 3}
                  color="var(--secondary-text-color)"
                />
                <span>{key}</span>
              </Button>
            ),
            children: boardItems.map((board) => (
              <BoardButton
                href={`/boards/${board.id}`}
                key={crypto.randomUUID()}
                type={board.type}
              >
                {board.name}
              </BoardButton>
            )),
          })
        )}
      />

      {formattedBoards.standalone.map((board) => (
        <BoardButton
          href={`/boards/${board.id}`}
          key={board.key}
          type={board.type}
        >
          {board.name}
        </BoardButton>
      ))}
      <style jsx>{``}</style>
    </>
  );
};

interface BoardButtonProps extends PropsWithChildren {
  type: BoardItem['type'];
  href: string;
}

export const BoardButton: FC<BoardButtonProps> = ({ ...props }) => {
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
        href={props.href}
      >
        <Icon icon={BOARD_ICON[props.type]} width={18} height={18} />
        <span>{props.children}</span>
      </Button>
      <style jsx>{``}</style>
    </>
  );
};

export default BoardPaneBoards;
