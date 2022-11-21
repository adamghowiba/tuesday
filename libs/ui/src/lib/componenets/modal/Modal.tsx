import React, { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import Overlay from '../Overlay';
import { Icon } from '@iconify/react';
import dismiss16Filled from '@iconify/icons-fluent/dismiss-16-filled';
import IconAction from '../actions/IconAction';
import Button from '../button/Button';
import { parseUnit } from '@tuesday/utils';
// import caretUp20Filled from '@iconify/icons-fluent/caret-up-20-filled';

export interface ModalProps extends PropsWithChildren {
  exitIcon?: boolean;
  onExit?: () => void;
  closeOnClickOutside?: boolean;
  actions?: ReactNode;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
}

const Modal: FC<ModalProps> = ({
  exitIcon = true,
  closeOnClickOutside = true,
  width = 400,
  height = 400,
  padding = 'var(--space-xl)',
  ...props
}) => {
  const handleClickOutside = () => {
    if (!closeOnClickOutside) return;

    props.onExit && props.onExit();
  };

  const ref = useClickOutside(handleClickOutside);

  return (
    <>
      <div className="modal" ref={ref}>
        {exitIcon && (
          <div className="exit-icon">
            <Button buttonStyle="ghost" onClick={props.onExit}>
              <Icon icon={dismiss16Filled} />
            </Button>
          </div>
        )}

        <div className="body">{props.children}</div>

        {props.actions && (
          <div className="footer">
            <div className="actions">{props.actions}</div>
          </div>
        )}
      </div>

      <Overlay />

      <style jsx>{`
        .modal {
          position: fixed;
          display: flex;
          flex-direction: column;
          padding: ${parseUnit(padding)};
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: ${parseUnit(width)};
          height: ${parseUnit(height)};
          background-color: var(--color-snow_white);
          z-index: 200;
          border-radius: var(--border-radius-medium);
        }

        .exit-icon {
          position: absolute;
          transform: translate(7px, -7px);
          top: ${parseUnit(padding)};
          right: ${parseUnit(padding)};
        }

        .body {
          height: 100%;
          width: 100%;
        }

        .footer {
          justify-content: flex-end;
          padding-top: var(--space-xl);

          .actions {
            display: flex;
            justify-content: flex-end;
            gap: var(--space-small);
          }
        }
      `}</style>
    </>
  );
};

Modal.defaultProps = {};

export default Modal;
