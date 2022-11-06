import { DragOverEvent } from '@shopify/draggable';
import { Button, Menu } from '@tuesday/ui';
import classNames from 'classnames';
import React, {
  ChangeEvent,
  FC,
  FocusEventHandler,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { ColumnType } from '@prisma/client';

export interface BoardColumn<T = any> {
  key: string;
  width?: number;
  headerName?: string;
  sticky?: boolean;
  customRender?: (row: T) => ReactElement;
}

export interface ColumnChangeParams {
  row: any;
  cell: any;
  cellIndex: number;
  column: BoardColumn;
  value: string;
  rowIndex: number;
}

interface BoardTableTProps {
  columns: BoardColumn[];
  rows: unknown[];
  onAddColumn: (type: string) => void;
  onCellChange?: (params: ColumnChangeParams) => void;
}

const BoardTableT: FC<BoardTableTProps> = ({
  columns: gridColumns,
  rows,
  ...props
}) => {
  const [columns, setColumns] = useState(gridColumns);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const COLUMN_TYPE_MAP: Record<ColumnType, string> = {
    TEXT: 'Text',
    AUTO_NUMBER: 'Number',
    CHECKBOX: 'Checkbox',
    LONG_TEXT: 'Description',
    STATUS: 'Status',
  };

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

  const onInputBlur = (params: ColumnChangeParams) => {
    if (props.onCellChange) props.onCellChange(params);
  };

  return (
    <>
      <div className="table-container">
        <table className="board">
          {/* HEADER */}
          <thead className="columns">
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
                <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>Add</Button>

                {isMenuOpen && (
                  <Menu>
                    {Object.entries(COLUMN_TYPE_MAP).map(([key, value]) => {
                      return (
                        <Button
                          key={key}
                          onClick={() => props.onAddColumn(key)}
                          style={{ textAlign: 'left', justifyContent: 'start' }}
                          fullWidth
                          buttonStyle="ghost"
                        >
                          {value}
                        </Button>
                      );
                    })}
                  </Menu>
                )}
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
                      <BoardTableInput
                        value={row[columns[cellIndex].key]}
                        onBlur={(value) =>
                          onInputBlur({
                            row,
                            rowIndex,
                            cell: row[columns[cellIndex].key],
                            cellIndex,
                            column: columns[cellIndex],
                            value,
                          })
                        }
                      />
                    </span>
                  </td>
                ))}

                <td className="cell"></td>
              </tr>
            ))}
          </tbody>
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
          position: relative;
          border-bottom: 1px solid var(--color-wolf_gray);
          border-right: 1px solid var(--color-wolf_gray);
          padding: 10px;
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

interface BoardTableProps {
  value?: string;
  onBlur?: (value: string) => void;
  onFocus?: FocusEventHandler;
}

export const BoardTableInput: FC<BoardTableProps> = ({
  value = '',
  ...props
}) => {
  const [inputValue, setValue] = useState<string>(value);

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={handleChangeEvent}
        onBlur={() => props.onBlur(inputValue)}
        onFocus={props.onFocus}
      ></input>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid transparent;

          &:hover {
            border: 1px solid var(--color-ui_grey);
          }
        }
      `}</style>
    </>
  );
};

export default BoardTableT;
