import { SystemProperties } from '@tuesday/ui';
import React, { CSSProperties, FC, forwardRef, PropsWithChildren } from 'react';

type TableCellStyles = Pick<
  CSSProperties,
  | 'border'
  | 'borderLeft'
  | 'borderRight'
  | 'borderTop'
  | 'borderBottom'
  | 'backgroundColor'
  | 'borderRadius'
  | 'padding'
  | 'display'
  | 'justifyContent'
  | 'alignItems'
  | 'gap'
>;

export interface TableCellProps extends PropsWithChildren, TableCellStyles {
  rowSpan?: number;
  colSpan?: number;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      children,
      padding,
      rowSpan,
      colSpan,
      display = 'flex',
      alignItems="center",
      ...props
    },
    ref
  ) => {
    return (
      <>
        <td ref={ref} colSpan={colSpan} rowSpan={rowSpan}>
          <div className="cell" style={{ ...props, padding, alignItems, display }}>
            {children}
          </div>
        </td>

        <style jsx>{`
          td {
            padding: 0;
            border-bottom: 1px solid #d0d4e4;
            border-left: 1px solid #d0d4e4;
            height: 30px;
          }
          .cell {
            margin: 0;
            height: 100%;
          }
        `}</style>
      </>
    );
  }
);

TableCell.displayName = TableCell.name;

export default TableCell;
