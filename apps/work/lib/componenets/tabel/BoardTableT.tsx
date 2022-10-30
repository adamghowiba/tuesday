import { DragOverEvent } from '@shopify/draggable';
import { Button } from '@tuesday/ui';
import classNames from 'classnames';
import React, { FC, ReactElement, useEffect, useState } from 'react';

export interface BoardColumn<T = any> {
  key: string;
  width?: number;
  headerName?: string;
  sticky?: boolean;
  customRender?: (row: T) => ReactElement;
}

interface BoardTableTProps {
  columns: BoardColumn[];
  rows: unknown[];
  onClickAdd?: () => void;
}

const BoardTableT: FC<BoardTableTProps> = ({
  columns: gridColumns,
  rows,
  ...props
}) => {
  const [columns, setColumns] = useState(gridColumns);

  useEffect(() => {
    const initDraggable = async () => {
      const { Swappable } = await import('@shopify/draggable');
      const status = document.querySelectorAll<HTMLDivElement>('.tr-header');
      const swapable = new Swappable(status, { draggable: '.cell--draggable' });
      let draggingElement = { fromIndex: NaN, toIndex: NaN };

      swapable.on('drag:out', (event: DragOverEvent) => {
        const newPosition = event.over;
        const source = event.source;

        draggingElement = {
          fromIndex: +source.getAttribute('data-index'),
          toIndex: +newPosition.getAttribute('data-index'),
        };
      });

      swapable.on('drag:stop', () => {
        if (!draggingElement?.fromIndex || !draggingElement?.toIndex) return;
        const { fromIndex, toIndex } = draggingElement;
        console.log('switched to', draggingElement);

        let swappedColumns: BoardColumn[] = [];

        swappedColumns = [...columns];
        swappedColumns[toIndex] = columns[fromIndex];
        swappedColumns[fromIndex] = columns[toIndex];

        setColumns(swappedColumns);
      });

      return () => {
        swapable.destroy();
      };
    };

    let destory: () => void;
    initDraggable().then((des) => (destory = des));

    return () => {
      if (destory) {
        console.log('destoryed');
        destory();
      }
    };
  }, [columns]);

  const getForamtedRows = (rows: any[], columns: BoardColumn[]) => {
    const isNotEmpty = (value: any) => value !== undefined && value !== null;

    return rows.map((row) => {
      return columns.reduce((acc: any, col, i) => {
        // const matchingColumn = columns[i];
        const matchingData = row?.[col.key];

        acc[col.key] = isNotEmpty(matchingData) ? matchingData : '--';
        return acc;
      }, {});
    });
  };

  return (
    <>
      <div className="table-container">
        <table className="board">
          {/* HEADER */}
          <thead className="columns">
            {/* <div className="cell cell--checkbox">
            <input type="checkbox" />
          </div> */}
            <tr className="tr-header">
              {columns.map((column, i) => (
                <td
                  className={classNames(
                    'cell',
                    'cell-header',
                    i !== 0 && 'cell--draggable',
                    column?.sticky && 'cell--sticky'
                  )}
                  data-index={i}
                  style={{ width: `${column.width}px` }}
                  key={column.key}
                >
                  <span>{column.headerName || column.key}</span>
                </td>
              ))}

              <td className="cell" style={{ width: '100px' }}>
                <button onClick={props.onClickAdd}>Add</button>
              </td>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="items">
            {getForamtedRows(rows, columns).map((row, rowIndex) => (
              <tr className="row" key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td
                    className={classNames(
                      'cell',

                      columns[cellIndex]?.sticky && 'cell--sticky'
                    )}
                    key={cellIndex}
                    style={{
                      width: columns[cellIndex]?.width
                        ? `${columns[cellIndex]?.width}px`
                        : 'auto',
                    }}
                  >
                    <span className="cell__value">
                      {row[columns[cellIndex].key]}
                    </span>
                  </td>
                ))}

                <td className="cell"></td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td></td>
              <td className="cell"> added</td>
              <td className="cell"> added</td>
              <td className="cell"> added</td>
              <td className="cell"> added</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <style jsx>{`
        .table-container {
          width: auto;
          display: flex;
        }

        .board {
          width: 100%;
          table-layout: fixed;
          position: relative;
          border: 0px solid var(--color-american_gray);
          border-spacing: 0;
          border-collapse: separate;
        }

        div :global(.draggable-container--is-dragging) {
          background-color: rgba(240, 128, 128, 0.2) !important;
          width: 150px;
          border: 1px solid green;
        }

        div :global(.draggable-source--is-dragging) {
          width: 150px;
        }

        div :global(.draggable--over) {
          background-color: var(--color-highlight_blue);
          width: 150px;
        }

        div :global(.draggable-mirror) {
          opacity: 0.5;
          width: 150px;
        }

        .cell {
          border-bottom: 1px solid var(--color-wolf_gray);
          border-right: 1px solid var(--color-wolf_gray);
          padding: 10px;
          overflow: hidden;
          background-color: white;
          text-overflow: ellipsis;

          &--checkbox {
            padding: 0 10px;
          }

          &--sticky {
            position: sticky;
            left: 0;
          }

          &--header {
            text-align: center;
          }

          &__value {
            white-space: nowrap;
          }
        }

        .row {
        }
      `}</style>
    </>
  );
};

BoardTableT.defaultProps = {};

export default BoardTableT;
