import React, { FC, useRef, useState } from 'react';
import TableRow from '../TabelRow';
import TableCell from '../TableCell';
import { BoardTableInput } from './BoradTable-Input';

export interface BoardTableAddRowProps {
  colSpan?: number;
  onAddItem: (item: string) => void;
}

const BoardTableAddRow: FC<BoardTableAddRowProps> = ({ colSpan, ...props }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleBlurEvent = () => {
    if (!inputValue) return;
    props.onAddItem(inputValue);

    setInputValue('');
  };

  const handleFocusEvent = () => {};

  return (
    <>
      <TableRow>
        <TableCell
          borderRadius="0 0 0 var(--space-xs)"
          borderLeft="3px solid var(--primary-color)"
          colSpan={colSpan}
        >
          <BoardTableInput
            onBlur={handleBlurEvent}
            onFocus={handleFocusEvent}
            align="left"
            placeholder="+ Add item"
            value={inputValue}
            onChange={(event, value) => setInputValue(value)}
          />
        </TableCell>
      </TableRow>
      <style jsx>{``}</style>
    </>
  );
};

BoardTableAddRow.defaultProps = {};

export default BoardTableAddRow;
