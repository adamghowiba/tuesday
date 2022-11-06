/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoardColumn } from './BoardTable';

export const getForamtedRows = (rows: any[], columns: BoardColumn[]) => {
  const isNotEmpty = (value: any) => value !== undefined && value !== null;

  const rowData =  rows.map((row) => {
    return Object.values(columns).reduce((acc: any, col, i) => {
      const matchingData = row?.[col.key];

      acc[col.key] = isNotEmpty(matchingData) ? matchingData : '--';
      return acc;
    }, {});
  });

  console.log(rowData);

  return rowData;
};
