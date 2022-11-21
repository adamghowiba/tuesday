import React, { FC, useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import chevronDown16Filled from '@iconify/icons-fluent/chevron-down-16-filled';
import OverFlowButton from 'libs/ui/src/lib/componenets/button/OverflowButton';
import { Button, Menu, MenuV2 } from '@tuesday/ui';
import { BoardContext } from 'apps/work/pages/boards/[boardId]';

export interface BoardGroupHeaderProps {
  title: string;
  color: string;
  taskCount: number;
  onDelete: (groupId: number) => void;
}

const BoardGroupHeader: FC<BoardGroupHeaderProps> = ({
  title,
  color,
  taskCount = 0,
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const boardContext = useContext(BoardContext);


  return (
    <>
      <header>
        <div className="overflow-button">
          <OverFlowButton onClose={() => setIsMenuOpen(false)}>
            <MenuV2.Group divider>
              <Button>Collapse this group</Button>
              <Button>Change Group Color</Button>
            </MenuV2.Group>
            <MenuV2.Group>
              <Button onClick={() => props.onDelete(boardContext.groupId)}>Delete</Button>
              <Button>Archive</Button>
            </MenuV2.Group>
          </OverFlowButton>
        </div>
        <Icon icon={chevronDown16Filled} color={color} />

        <h5 className="title">{title}</h5>
        <span className="task-count">{taskCount} Tasks</span>
      </header>

      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          padding: var(--space-small) 0;
          gap: var(--space-small);

          &:hover .overflow-button,
          &:hover .task-count {
            opacity: 1;
          }

          .overflow-button {
            opacity: 0;
          }
        }

        .title {
          color: ${color};
        }

        .task-count {
          font-size: var(--font-size-subtext);
          color: var(--secondary-text-color);
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default BoardGroupHeader;
