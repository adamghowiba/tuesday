import { createPopper, Placement, PositioningStrategy } from '@popperjs/core';
import { parseUnit } from '@tuesday/utils';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import {
  createContext, CSSProperties, FC,
  MouseEventHandler,
  PropsWithChildren, useEffect,
  useRef
} from 'react';
import { useClickAway } from '../../hooks/useClickOutside';
import { ButtonProps } from '../button/Button';

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
  skidding?: number;
  distance?: number;
  isOpen?: boolean;
  strategy?: PositioningStrategy;
  closeOnClick?: boolean;
  sx?: CSSProperties;
  onClose?: () => void;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onMouseEnterButton?: () => void;
  onClickMenuButton?: () => void;
}
export const SubMenuContext = createContext<number>(0);
export const MenuButtonContext = createContext<{
  onMouseEnterButton: () => void;
  onClickMenuButton: () => void;
} | null>(null);

const MenuV2: FC<MenuV2Props> = ({
  anchorEl,
  placement = 'bottom-start',
  elevation = 'medium',
  width = 'auto',
  height = 'auto',
  strategy = 'absolute',
  isOpen = false,
  skidding = 0,
  closeOnClick = true,
  distance = 5,
  ...props
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // useClickAway([anchorEl, menuRef.current], () => {
  //   if (isOpen && props.onClose) props.onClose();
  // });

  const handleClickMenuButton = () => {
    if (props?.onClickMenuButton) props.onClickMenuButton()
    if (closeOnClick && props.onClose) props.onClose();
  }

  useEffect(() => {
    if (!menuRef.current || !anchorEl) return;

    createPopper(anchorEl, menuRef.current, {
      placement: placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [skidding, distance],
          },
        },
      ],
    });
  }, [anchorEl, placement, skidding, distance, strategy, isOpen, menuRef]);

  return (
    <>
      <MenuButtonContext.Provider
        value={{
          onMouseEnterButton: () =>
            props.onMouseEnterButton && props.onMouseEnterButton(),
          onClickMenuButton: handleClickMenuButton
        }}
      >
        {isOpen && (
          <div
            className="menu-container"
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
          >
            <motion.div
              className={classNames('menu', `elevation--${elevation}`)}
              style={props.sx}
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
        )}
      </MenuButtonContext.Provider>

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
