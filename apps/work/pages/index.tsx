import { Button } from '@tuesday/ui';
import ToolTip from '../lib/componenets/global/tooltip/Tooltip';
import BaseLayout from '../lib/layouts/DashboardLayout';
import BoardSidebar from '../lib/views/board/sidebar/BoardPane';
import { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  return (
    <>
      <div className="page">
      <BoardSidebar />


      </div>

      <style jsx>{`
        .page {
          display: flex;
          height: 100%;
          gap: 7rem;
        }
      `}</style>
    </>
  );
};

export default Index;
