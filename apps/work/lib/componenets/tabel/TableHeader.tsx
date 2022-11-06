import React, { FC, PropsWithChildren } from 'react';

export interface TableHeaderProps extends PropsWithChildren {}

const TableHeader: FC<TableHeaderProps> = (props) => {
  return (
    <>
      <thead>{props.children}</thead>
      <style jsx>{``}</style>
    </>
  );
};

TableHeader.defaultProps = {};

export default TableHeader;
