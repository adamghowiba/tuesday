import React, { CSSProperties, FC, PropsWithChildren } from 'react';
import {
  getSystemProperties,
  SystemProperties,
} from '../../../utils/system-styles';

export interface BoxProps extends PropsWithChildren, SystemProperties {
  component?: 'span' | 'div' | 'article';
  sx?: CSSProperties;
}

const Box: FC<BoxProps> = ({
  alignItems = 'start',
  sx,
  component = 'div',
  ...props
}) => {
  return (
    <>
      {React.createElement(component, {
        style: { ...sx, ...getSystemProperties(props) },
        children: props.children,
      })}

      <style jsx>{`
        .box {
          display: block;
        }
      `}</style>
    </>
  );
};

export default Box;
