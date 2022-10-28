import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';
import alert16Regular from '@iconify/icons-fluent/alert-16-regular';
import alert12Regular from '@iconify/icons-fluent/alert-12-regular';
import WorkMangementIcon from '../icons/WorkMangementIcon';
import Divider from '../global/Divider';
import { ReactElement } from 'react';
import NotifcationIcon from '../icons/NotifcationsIcon';
import InboxIcon from '../icons/InboxIcon';
import WorkIcon from '../icons/WorkIcon';
import FavoritesIcon from '../icons/FavoritesIcon';
import { createPopper } from '@popperjs/core';
import ToolTip from '../global/Tooltip';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarProps {}

const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <>
      <div className="sidebar">
        <img src="/images/tuesday_logo.png" className="sidebar__logo"></img>

        <Divider margin="5px 0px 15px 0px" />

        <div className="top-navigation">
          <WorkMangementIcon />
          <IconAction icon={<NotifcationIcon />} />
          <IconAction icon={<InboxIcon />} />
          <IconAction icon={<WorkIcon />} />
          <IconAction icon={<FavoritesIcon />} />
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          flex-direction: column;
          height: 100%;
          background-color: var(--color-surface);
          color: var(--text-color-on-primary);
          padding: var(--space-small);

          &__logo {
            max-width: 48px;
            width: 100%;
          }
        }

        .top-navigation {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-small);
          width: 100%;
        }
      `}</style>
    </>
  );
};

Sidebar.defaultProps = {};

export interface IconAction {
  icon: ReactElement | IconifyIcon;
  size?: number;
}
const IconAction: FC<IconAction> = ({ icon, size = 22 }) => {
  const actionRef = useRef<HTMLDivElement>(null);
  const toolTipRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="action" ref={actionRef}>
        {React.isValidElement(icon) ? (
          icon
        ) : (
          <Icon icon={icon} width={size} height={size} />
        )}
      </div>

      <style jsx>
        {`
          .action {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--border-radius-medium);
            padding: var(--space-small);

            &:hover {
              background-color: var(--color-black);
            }
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
