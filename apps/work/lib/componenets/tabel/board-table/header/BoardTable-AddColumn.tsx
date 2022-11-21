import add16Filled from '@iconify/icons-fluent/add-16-filled';
import { Icon } from '@iconify/react';
import { ColumnType } from '@prisma/client';
import { Button, MenuV2 } from '@tuesday/ui';
import { useClickOutside } from 'libs/ui/src/lib/hooks/useClickOutside';
import { FC, useRef, useState } from 'react';
import TableCell from '../../TableCell';

export interface BoardTableAddColumnProps {
  onAddColumn?: (type: ColumnType) => void;
}

const BoardTableAddColumn: FC<BoardTableAddColumnProps> = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tableCellRef = useClickOutside(() => setIsMenuOpen(false));
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const COLUMN_TYPE_MAP: Record<ColumnType, string> = {
    TEXT: 'Text',
    AUTO_NUMBER: 'Number',
    CHECKBOX: 'Checkbox',
    LONG_TEXT: 'Description',
    STATUS: 'Status',
  };

  const handleAddColumn = (key: ColumnType) => {
    if (props.onAddColumn) props.onAddColumn(key);
  };

  return (
    <>
      <TableCell ref={tableCellRef}>
        <Button
          buttonStyle="ghost"
          size="small"
          ref={buttonRef}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Icon icon={add16Filled} />
        </Button>

        <MenuV2
          isOpen={isMenuOpen}
          anchorEl={buttonRef.current}
          placement="bottom-start"
          width={150}
          closeOnClick
          onClose={() => setIsMenuOpen(false)}
        >
          {Object.entries(COLUMN_TYPE_MAP).map(([key, value]) => (
            <MenuV2.Button
              key={key}
              onClick={() => handleAddColumn((key as ColumnType))}
            >
              {value}
            </MenuV2.Button>
          ))}
        </MenuV2>
      </TableCell>
      <style jsx>{``}</style>
    </>
  );
};

BoardTableAddColumn.defaultProps = {};

export default BoardTableAddColumn;
