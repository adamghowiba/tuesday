import React, { FC, PropsWithChildren } from 'react';

export interface TableBodyProps extends PropsWithChildren {}

const TableBody: FC<TableBodyProps> = (props) => {
  return (
    <>
      <tbody>{props.children}</tbody>
      <style jsx>{``}</style>
    </>
  );
};

TableBody.defaultProps = {};

export default TableBody;
