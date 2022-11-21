/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonProps, Menu, MenuV2 } from '@tuesday/ui';
import OverFlowButton from 'libs/ui/src/lib/componenets/button/OverflowButton';
import React, {
  ChangeEvent,
  FC,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import { any } from 'zod';
import Table from '../Tabel';
import TableRow from '../TabelRow';
import TableBody from '../TableBody';
import TableCell from '../TableCell';
import TableFooter from '../TableFooter';
import TableHeader from '../TableHeader';
import { getForamtedRows } from './board-table.logic';
import BoardTableAddColumn, {
  BoardTableAddColumnProps,
} from './header/BoardTable-AddColumn';
import BoardTableAddRow, { BoardTableAddRowProps } from './BoardTable-AddRow';
import { BoardTableInput } from './BoradTable-Input';
import BoardTableHeader, {
  BoardTableHeaderProps,
} from './header/BoardTableHeader';
import { Column, ColumnType, Status } from '@prisma/client';
import StatusMenu from './StatusMenu';
import { BoardApi } from '@tuesday/types';
import { StatusBadgeProps } from '../../status/StatusBadge';
import BoardGroupHeader, { BoardGroupHeaderProps } from './group/BoardGroupHeader';

export interface BoardColumn<T = any> {
  key: string;
  width?: number;
  headerName?: string;
  sticky?: boolean;
  editable?: boolean;
  type?: ColumnType;
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
  columns: BoardColumn[];
  rows: any[];
  title: string;
  statusList?: BoardApi.GetResponseBody['statuses'];
  color?: string;
  groupId: number;
  onCellEdit: (params: CellEditParams) => void;
  onAddColumn?: BoardTableAddColumnProps['onAddColumn'];
  onColumnChange: BoardTableHeaderProps['onColumnChange'];
  onDeleteColumn?: BoardTableHeaderProps['onDeleteColumn'];
  onAddItem?: BoardTableAddRowProps['onAddItem'];
  onClickStatus?: StatusBadgeProps['onClickStatus'];
  onDeleteGroup: BoardGroupHeaderProps['onDelete']
}

const BoardTable: FC<BoardTableProps> = ({
  color = 'red',
  columns,
  rows,
  title,
  ...props
}) => {
  const [highlightedRows, setHighlightedRows] = useState<number[]>([]);
  const formattedRows = useMemo(
    () => getForamtedRows(rows, columns),
    [rows, columns]
  );
  const editingTempValue = useRef<any>(undefined);

  const getInputTypeFromColumnType = (columnType: ColumnType) => {
    if (columnType === 'TEXT') return 'text';
    if (columnType === 'AUTO_NUMBER') return 'number';
  };

  const editableInput = ({
    cellIndex,
    column,
    row,
    rowIndex,
    value,
    type,
  }: CellEditParams & { type: ColumnType }) => {
    return (
      <BoardTableInput
        key={column.key}
        value={value}
        type={getInputTypeFromColumnType(type)}
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

  /* Todo: Doesn't work */
  const handleEditLabels = (params) => {
    console.log('Edit labeles');
  };

  const transformRowValue = (
    value: any,
    { column, rowData, rowIndex, cellIndex }: TransformRowValueParams
  ) => {
    if (column?.customRender) return column.customRender(rowData);

    if (column.type === 'STATUS')
      return (
        <StatusMenu
          onClickStats={({ color, label, id }) =>
            props.onCellEdit({
              cellIndex,
              column,
              row: rowData,
              rowIndex,
              value: id,
            })
          }
          statusList={props.statusList}
          activeStatusId={value}
          onEditLabels={handleEditLabels}
        />
      );

    if (column?.editable)
      return editableInput({
        cellIndex,
        rowIndex,
        row: rowData,
        column,
        value,
        type: column.type,
      });

    return String(value);
  };

  return (
    <>
      <div className="table-container">
        <BoardGroupHeader title={title} color={color} taskCount={rows.length} onDelete={props.onDeleteGroup} />

        <div className="table-wrapper"></div>
        <Table>
          <BoardTableHeader
            columns={columns}
            color={color}
            onAddColumn={props.onAddColumn}
            onColumnChange={props.onColumnChange}
            onDeleteColumn={props.onDeleteColumn}
          />

          <TableBody>
            {formattedRows.map((row, rowIndex) => (
              <TableRow
                key={row?.id || rowIndex}
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
                    {transformRowValue(row[columns[cellIndex].key], {
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
              colSpan={columns.length + 1}
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
        .header-cell {
          margin-left: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: 30px;
        }
        .overflow-button {
          margin-left: auto;
        }
      `}</style>
    </>
  );
};

BoardTable.defaultProps = {};

export default BoardTable;
