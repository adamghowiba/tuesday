import { Button } from '@tuesday/ui';
import ToolTip from '../lib/componenets/global/Tooltip';
import BaseLayout from '../lib/layouts/DashboardLayout';
import { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  return (
    <>
      <ToolTip>
        <Button buttonType="submit"></Button>
      </ToolTip>

      <style jsx>{`
        .page {
        }
      `}</style>
    </>
  );
};

export default Index;
