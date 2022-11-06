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
>;

export interface TableCellProps extends PropsWithChildren, TableCellStyles {
  rowSpan?: number;
  colSpan?: number;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({
  children,
  padding = 'var(--space-xs)',
  rowSpan,
  colSpan,
  ...props
}, ref) => {
  return (
    <>
      <td ref={ref} colSpan={colSpan} rowSpan={rowSpan} style={{ ...props, padding }}>
        <div className="cell">{children}</div>
      </td>

      <style jsx>{`
        td {
          border-bottom: 1px solid #d0d4e4;
          border-left: 1px solid #d0d4e4;
        }
      `}</style>
    </>
  );
});

TableCell.displayName = TableCell.name

export default TableCell;
