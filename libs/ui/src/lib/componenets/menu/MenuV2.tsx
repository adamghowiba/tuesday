import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPopper, Placement } from '@popperjs/core';
import { ButtonProps } from '../button/Button';
import { parseUnit } from '@tuesday/utils';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface MenuContext {
  buttonProps: ButtonProps;
}
export const MenuContext = createContext<MenuContext | null>(null);

export interface MenuV2Props extends PropsWithChildren {
  anchorEl: HTMLElement | null;
  placement?: Placement;
  elevation?: 'medium' | 'large';
  width?: number | string;
  height?: number | string;
  isOpen?: boolean;
}

const MenuV2: FC<MenuV2Props> = ({
  anchorEl,
  placement = 'bottom-start',
  elevation = 'medium',
  width = 'auto',
  height = 'auto',
  isOpen = false,
  ...props
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuRef.current || !anchorEl) return;

    createPopper(anchorEl, menuRef.current, {
      placement: placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        },
      ],
    });
  }, [anchorEl, placement]);

  useEffect(() => {
    setIsMenuOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <div className="menu-container">
        <motion.div
          className={classNames('menu', `elevation--${elevation}`)}
          ref={menuRef}
        >
          <MenuContext.Provider
            value={{
              buttonProps: {
                fullWidth: true,
                buttonStyle: 'ghost',
                textAlign: 'left',
                textWrap: 'nowrap',
              },
            }}
          >
            {props.children}
          </MenuContext.Provider>
        </motion.div>
      </div>

      <style jsx>{`
        .menu-container :global(.menu) {
          display: flex;
          flex-direction: column;
          width: ${parseUnit(width)};
          height: ${parseUnit(height)};
          background-color: var(--color-snow_white);
          box-shadow: var(--box-shadow-small);
          z-index: 100;
          // Deciding upon using padding or not.
          // padding: var(--space-small);
          border-radius: var(--border-radius-small);

          &.elevation--medium {
            box-shadow: var(--box-shadow-small);
          }

          &.elevation--large {
            box-shadow: var(--box-shadow-medium);
          }
        }
      `}</style>
    </>
  );
};

MenuV2.defaultProps = {};

export default MenuV2;
