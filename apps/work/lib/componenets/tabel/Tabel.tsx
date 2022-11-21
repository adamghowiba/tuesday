import React, { FC, PropsWithChildren } from 'react';

export interface TableProps extends PropsWithChildren {}

const Table: FC<TableProps> = (props) => {
  return (
    <>
      <table>{props.children}</table>
      <style jsx>{`
        table {
          table-layout: fixed;

          width: 100%;
          background-color: var(--color-snow_white);
          border-radius: var(--border-radius-medium);
          border-spacing: 0;
          font: var(--font-general-label);
          // border: 1px solid green;
        }
      `}</style>
    </>
  );
};

export default Table;
