import { parseUnit } from '@tuesday/utils';
import React, { CSSProperties, FC, PropsWithChildren, useEffect } from 'react';
import {
  getSystemProperties,
  SystemProperties,
} from '../../../utils/system-styles';

type BaseAlignment = 'start' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends PropsWithChildren, SystemProperties {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'center' | 'start' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  sx?: CSSProperties;
  gap?: string | number;
}

const Stack: FC<StackProps> = ({
  direction = 'row',
  align = 'start',
  gap = 0,
  justify = 'start',
  sx,
  ...props
}) => {
  const mapAlignment = (alignment: any) => {
    const ALIGNMENT_MAP: Record<BaseAlignment, string> = {
      around: 'space-around',
      between: 'space-between',
      end: 'flex-end',
      start: 'flex-start',
      evenly: 'space-evenly',
    };

    return ALIGNMENT_MAP?.[alignment as BaseAlignment] || alignment;
  };

  return (
    <>
      <div className="stack" style={{ ...sx, ...getSystemProperties(props) }}>
        {props.children}
      </div>

      <style jsx>{`
        .stack {
          display: flex;
          flex-direction: ${direction};
          justify-content: ${mapAlignment(justify)};
          align-items: ${mapAlignment(align)};
          gap: ${parseUnit(gap, 'rem')};
        }
      `}</style>
    </>
  );
};

Stack.defaultProps = {};

export default Stack;
