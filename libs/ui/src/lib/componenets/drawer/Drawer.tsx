import React, { FC, PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { parseUnit } from '@tuesday/utils';

export interface DrawerProps extends PropsWithChildren {
  placement?: 'left' | 'right';
  backgroundColor?: string;
  isOpen?: boolean;
  width?: number | string;
  zIndex?: number;
}

const Drawer: FC<DrawerProps> = ({
  placement = 'left',
  backgroundColor = 'var(--color-snow)',
  isOpen = false,
  width = 400,
  zIndex = 110,
  ...props
}) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="drawer-container" style={{ zIndex }}>
            <motion.div
              key="drawer"
              initial={{ translateX: '-100%' }}
              animate={{ translateX: 0 }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeIn' }}
              exit={{ translateX: '-100%' }}
              className="drawer"
            >
              {props.children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .drawer-container {
          position: absolute;
          width: ${parseUnit(width)};
          left: 0;
          height: 100%;
          z-index: 100;
        }

        .drawer-container :global(.drawer) {
          height: 100%;
          width: 100%;
          background-color: ${backgroundColor};
          box-shadow: var(--box-shadow-medium);
        }
      `}</style>
    </>
  );
};

Drawer.defaultProps = {};

export default Drawer;
