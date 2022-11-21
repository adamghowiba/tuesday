import { Button, MenuV2 } from '@tuesday/ui';
import { api } from 'apps/work/lib/api/api';
import OverFlowButton from 'libs/ui/src/lib/componenets/button/OverflowButton';
import React, { FC, FocusEvent, Key, useEffect, useRef, useState } from 'react';
import { parseMutationArgs } from 'react-query/types/core/utils';
import TableRow from '../../TabelRow';
import TableCell from '../../TableCell';
import TableHeader from '../../TableHeader';
import { BoardTableProps } from '../BoardTable';
import { BoardTableInput } from '../BoradTable-Input';
import BoardTableAddColumn from './BoardTable-AddColumn';
import BoardTableHeaderMenu from './BoardTableHeaderMenu';

export interface ColumnChangeParams {
  id: Key;
  value: string | number;
}

export interface ColumnDeleteParams {
  columnId: string;
}

export interface BoardTableHeaderProps
  extends Pick<BoardTableProps, 'columns' | 'color' | 'onAddColumn'> {
  onColumnChange?: (params: ColumnChangeParams) => void;
  onDeleteColumn?: (params: ColumnDeleteParams) => void;
}

const BoardTableHeader: FC<BoardTableHeaderProps> = ({
  columns,
  color,
  ...props
}) => {
  const headerColumnBlur = (params: ColumnChangeParams) => {
    if (props.onColumnChange)
      props.onColumnChange({ id: params.id, value: params.value });
  };

  const handleDelete = (params: { columnId: string }) => {
    props.onDeleteColumn && props.onDeleteColumn({ columnId: params.columnId });
  };

  return (
    <>
      <TableHeader>
        <TableRow textAlign="center">
          {columns.map((column, i) => (
            <TableCell
              key={column.key}
              justifyContent="center"
              borderTop="1px solid #d0d4e4"
              borderLeft={!i ? `3px solid ${color}` : '1px solid #d0d4e4'}
              borderRight={
                i === columns.length - 1 ? '1px solid #d0d4e4' : 'none'
              }
              borderRadius={!i ? 'var(--space-xs) 0 0 0' : 'none'}
            >
              <span className="header-cell">
                <BoardTableInput
                  value={column.headerName}
                  onBlur={(event, value) =>
                    headerColumnBlur({ id: column.key, value })
                  }
                />
              </span>

              <div className="overflow-button">
                <BoardTableHeaderMenu
                  onDelete={() => handleDelete({ columnId: column.key })}
                />
              </div>
            </TableCell>
          ))}

          <BoardTableAddColumn onAddColumn={props.onAddColumn} />
        </TableRow>
      </TableHeader>
      <style jsx>{``}</style>
    </>
  );
};

BoardTableHeader.defaultProps = {};

export default BoardTableHeader;
