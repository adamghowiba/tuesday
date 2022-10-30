import { Button } from '@tuesday/ui';
import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import info24Regular from '@iconify/icons-fluent/info-24-regular';
import star16Regular from '@iconify/icons-fluent/star-16-regular';
import star20Filled from '@iconify/icons-fluent/star-20-filled';
import ToolTip from '../../componenets/global/tooltip/Tooltip';

interface BoardHeaderProps {
  title: string;
  isFavorite?: boolean;
}

const BoardHeader: FC<BoardHeaderProps> = (props) => {
  return (
    <>
      <header className="header">
        <h1>{props.title}</h1>

        <ToolTip content="Show board description" placement="bottom">
          <Button buttonStyle="ghost">
            <Icon icon={info24Regular} width={18} height={18} />
          </Button>
        </ToolTip>

        <ToolTip
          content={
            props.isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
          placement="bottom"
        >
          <Button buttonStyle="ghost">
            <Icon
              icon={star20Filled}
              width={19}
              height={19}
              color="var(--color-yellow)"
            />
          </Button>
        </ToolTip>
      </header>

      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }

        h1 {
          font-size: var(--font-size-50);
          font-weight: 700;
          font-family: var(--font-family);
        }
      `}</style>
    </>
  );
};

BoardHeader.defaultProps = {
  isFavorite: false,
};

export default BoardHeader;
