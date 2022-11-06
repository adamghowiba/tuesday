/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { any } from 'zod';
import Table from '../Tabel';
import TableRow from '../TabelRow';
import TableBody from '../TableBody';
import TableCell from '../TableCell';
import TableFooter from '../TableFooter';
import TableHeader from '../TableHeader';
import { getForamtedRows } from './board-table.logic';
import BoardTableAddColumn, { BoardTableAddColumnProps } from './BoardTable-AddColumn';
import BoardTableAddRow, { BoardTableAddRowProps } from './BoardTable-AddRow';
import { BoardTableInput } from './BoradTable-Input';

export interface BoardColumn<T = any> {
  key: string;
  width?: number;
  headerName?: string;
  sticky?: boolean;
  editable?: boolean;
  customRender?: (row: T) => ReactElement;
}

interface TransformRowValueParams {
  rowData: any;
  column: BoardColumn;
  rowIndex: number;
  cellIndex: number;
}

export interface CellEditParams {
  rowIndex: number;
  cellIndex: number;
  row: any;
  column: BoardColumn;
  value: any;
}

export interface BoardTableProps {
  color?: string;
  columns: BoardColumn[];
  rows: any[];
  onCellEdit: (params: CellEditParams) => void;
  onAddColumn?: BoardTableAddColumnProps['onAddColumn'];
  onAddItem?: BoardTableAddRowProps['onAddItem'];
}

const BoardTable: FC<BoardTableProps> = ({
  color = 'red',
  columns,
  rows,
  ...props
}) => {
  const [highlightedRows, setHighlightedRows] = useState<number[]>([]);
  const formattedRows = getForamtedRows(rows, columns);
  const editingTempValue = useRef<any>(undefined);

  const editableInput = ({
    cellIndex,
    column,
    row,
    rowIndex,
    value,
  }: CellEditParams) => {
    return (
      <BoardTableInput
        key={column.key}
        value={value}
        onFocus={(event: ChangeEvent) => {
          if (!highlightedRows.includes(rowIndex))
            setHighlightedRows((rows) => [...rows, rowIndex]);
          editingTempValue.current = value;
        }}
        onBlur={(event, value) => {
          setHighlightedRows(
            rows.filter((_rowIndex) => _rowIndex !== rowIndex)
          );
          if (editingTempValue.current === value) return;
          props?.onCellEdit &&
            props.onCellEdit({
              value,
              rowIndex,
              cellIndex,
              column,
              row: row,
            });
        }}
      />
    );
  };

  const transformRowValue = (
    value: any,
    { column, rowData, rowIndex, cellIndex }: TransformRowValueParams
  ) => {
    if (column?.customRender) return column.customRender(rowData);

    if (column?.editable)
      return editableInput({
        cellIndex,
        rowIndex,
        row: rowData,
        column,
        value,
      });

    return String(value);
  };

  return (
    <>
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow textAlign="center">
              {columns.map((column, i) => (
                <TableCell
                  key={column.key}
                  borderTop="1px solid #d0d4e4"
                  borderLeft={!i ? `3px solid ${color}` : 'none'}
                  borderRight={
                    i === columns.length - 1 ? '1px solid #d0d4e4' : 'none'
                  }
                  borderRadius={!i ? 'var(--space-xs) 0 0 0' : 'none'}
                >
                  {column?.headerName || column.key}
                </TableCell>
              ))}

              <BoardTableAddColumn onAddColumn={props.onAddColumn} />
            </TableRow>
          </TableHeader>

          <TableBody>
            {formattedRows.map((row, rowIndex) => (
              <TableRow
                key={row?.id}
                highlighted={highlightedRows.includes(rowIndex)}
              >
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    borderRight={
                      cellIndex === columns.length - 1
                        ? '1px solid #d0d4e4'
                        : 'none'
                    }
                    borderLeft={
                      !cellIndex ? `3px solid ${color}` : '1px solid #d0d4e4'
                    }
                  >
                    {transformRowValue(value, {
                      rowData: rows[rowIndex],
                      rowIndex: rowIndex,
                      column: columns[cellIndex],
                      cellIndex,
                    })}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            ))}

            <BoardTableAddRow
              colSpan={columns.length}
              onAddItem={props.onAddItem}
            />
          </TableBody>

          <TableFooter />
        </Table>
      </div>

      <style jsx>{`
        .table-container {
          width: 100%;
        }
      `}</style>
    </>
  );
};

BoardTable.defaultProps = {};

export default BoardTable;
