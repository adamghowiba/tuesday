import { Icon, IconifyIcon } from '@iconify/react';
import Link from 'next/link';
import React, { FC, MouseEventHandler, ReactElement, useRef } from 'react';

export interface ActionProps {
  icon: ReactElement | IconifyIcon;
  href?: string;
  size?: number;
  onClick?: MouseEventHandler;
}

const Action: FC<ActionProps> = ({ icon, size = 22, ...props }) => {
  const actionRef = useRef<HTMLDivElement>(null);

  const IconElement = () =>
    React.isValidElement(icon) ? (
      icon
    ) : (
      <Icon icon={icon} width={size} height={size} />
    );

  return (
    <>
      {props.href ? (
        <Link href={props.href}>
          <div className="action" ref={actionRef} onClick={props.onClick}>
            <div className="link-icon">
              <IconElement />
            </div>
          </div>
        </Link>
      ) : (
        <div className="action" ref={actionRef} onClick={props.onClick}>
          <IconElement />
        </div>
      )}

      <style jsx>
        {`
          .action {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--border-radius-medium);
            padding: var(--space-small);
            cursor: pointer;

            .link-wrap {
              border: 1px solid red;
              position: absolute;
              left: 0;
              background-color: red;
              top: 0;
              height: 100%;
              width: 100%;
            }

            .link-icon {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            &:hover {
              background-color: var(--color-black);
            }
          }
        `}
      </style>
    </>
  );
};

export default Action
