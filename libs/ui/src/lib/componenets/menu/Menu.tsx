import { parseUnit } from '@tuesday/utils';
import classNames from 'classnames';
import React, { CSSProperties, FC, PropsWithChildren } from 'react';

export interface MenuProps extends PropsWithChildren {
  elevation?: 'medium' | 'large';
  xPosition?: 'left' | 'right' | 'center';
  yPosition?: 'top' | 'bottom';
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
}

const Menu: FC<MenuProps> = ({
  elevation = 'medium',
  xPosition,
  yPosition,
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
        }
      `}</style>
    </>
  );
};

export default Menu;
