import { parseUnit } from '@tuesday/utils';
import classNames from 'classnames';
import React, { CSSProperties, FC, PropsWithChildren } from 'react';
import Stack from '../layout/stack/Stack';

export interface MenuProps extends PropsWithChildren {
  xPosition?: 'left' | 'right' | 'center';
  yPosition?: 'top' | 'bottom';
  elevation?: 'medium' | 'large';
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
}

const Menu: FC<MenuProps> = ({
  xPosition,
  yPosition,
  elevation = 'medium',
  width = 'auto',
  height = 'auto',
  style,
  ...props
}) => {
  return (
    <>
      <aside
        style={{ width: parseUnit(width), height: parseUnit(height), ...style }}
        className={classNames(
          'menu',
          `x-position--${xPosition}`,
          `y-position--${yPosition}`
        )}
      >
        <div className="menu__body">{props.children}</div>
      </aside>

      <style jsx>{`
        .menu {
          position: absolute;
          background-color: var(--modal-background-color);
          box-shadow: var(--box-shadow-small);
          bottom: 0;
          transform: translateY(100%);
          z-index: 10;
          padding: var(--space-small);

          &__body {
            display: flex;
            flex-direction: column;
            gap: var(--space-xs);
          }

          &.x-position--right {
            right: 0;
          }

          &.x-position--center {
            right: 50%;
            transform: translateX(-50%);
          }

          &.x-position--left {
            left: 0;
          }

          &.y-position--top {
            top: 0;
            bottom: unset;
            transform: translateY(-100%);
          }
        }
      `}</style>
    </>
  );
};



export default Menu;
