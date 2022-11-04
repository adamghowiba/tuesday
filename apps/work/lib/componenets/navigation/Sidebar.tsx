import { Icon, IconifyIcon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, MouseEventHandler, ReactElement, useRef } from 'react';
import Divider from '../global/Divider';
import IconAction from '../global/IconAction';
import ToolTip from '../global/tooltip/Tooltip';
import FavoritesIcon from '../icons/FavoritesIcon';
import InboxIcon from '../icons/InboxIcon';
import NotifcationIcon from '../icons/NotifcationsIcon';
import WorkIcon from '../icons/WorkIcon';
import WorkMangementIcon from '../icons/WorkMangementIcon';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarProps {}

const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__logo">
          <Image
            src="/images/tuesday_logo.png"
            className="sidebar__logo"
            alt="Tuesday Logo"
            width={40}
            height={40}
          />
        </div>

        <Divider margin="5px 0px 15px 0px" color="dark" />

        <div className="top-navigation">
          <ToolTip placement="right" content="Work Mangement">
            <IconAction icon={<WorkMangementIcon />} href="/boards/1" />
          </ToolTip>

          <ToolTip placement="right" content="Notifcations">
            <IconAction icon={<NotifcationIcon />} />
          </ToolTip>

          <ToolTip placement="right" content="Inbox">
            <IconAction icon={<InboxIcon />} />
          </ToolTip>

          <ToolTip placement="right" content="My Work">
            <IconAction icon={<WorkIcon />} />
          </ToolTip>

          <ToolTip placement="right" content="Favorites">
            <IconAction icon={<FavoritesIcon />} />
          </ToolTip>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          flex-direction: column;
          height: 100%;
          align-items: center;
          background-color: var(--color-surface);
          color: var(--text-color-on-primary);
          padding: var(--space-small);

          &__logo {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
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

export default Sidebar;
