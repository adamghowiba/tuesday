import { Button } from '@tuesday/ui';
import ToolTip from '../lib/componenets/global/tooltip/Tooltip';
import BaseLayout from '../lib/layouts/DashboardLayout';
import { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  return (
    <>
      <div className="page">

      </div>

      <style jsx>{`
        .page {
          display: flex;
          gap: 7rem;
          padding: 7rem;
        }
      `}</style>
    </>
  );
};

export default Index;
