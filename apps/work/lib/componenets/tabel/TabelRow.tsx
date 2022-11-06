import classNames from 'classnames';
import React, { CSSProperties, FC, PropsWithChildren } from 'react';

export type TableRowStyles = Pick<
  CSSProperties,
  'textAlign' | 'backgroundColor'
>;

export interface TableRowProps extends PropsWithChildren, TableRowStyles {
  highlighted?: boolean;
}

const TableRow: FC<TableRowProps> = ({ children, highlighted, ...props }) => {
  return (
    <>
      <tr className={classNames(highlighted && 'highlighted')} style={props}>
        {children}
      </tr>

      <style jsx>{`
        tr {

          &.highlighted {
            background-color: var(--color-highlight);
          }
        }
      `}</style>
    </>
  );
};

TableRow.defaultProps = {};

export default TableRow;
