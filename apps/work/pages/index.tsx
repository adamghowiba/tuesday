import { Button, Drawer, MenuV2, Stack } from '@tuesday/ui';
import OverFlowButton from 'libs/ui/src/lib/componenets/button/OverflowButton';
import { useRef, useState } from 'react';
import ToolTip from '../lib/componenets/global/tooltip/Tooltip';
import NotifcationDrawer from '../lib/componenets/drawers/NotficationDrawer';
import BaseLayout from '../lib/layouts/DashboardLayout';
import BoardSidebar from '../lib/views/board/sidebar/BoardPane';
import { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  return (
    <>
      <div className="page">{/* <BoardSidebar /> */}</div>

      <style jsx>{`
        .left {
          left: 0;
          position: absolute;
          height: 100%;
          width: 0px;
          background-color: red;
        }
        .page {
          position: relative;
          display: flex;
          height: 100%;
          width: 100%;
        }

        .button {
          position: relative;
          margin-left: 30rem;
        }
      `}</style>
    </>
  );
};

export default Index;
