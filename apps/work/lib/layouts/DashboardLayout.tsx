import React, { FC, PropsWithChildren } from 'react';
import Sidebar from '../componenets/navigation/Sidebar';
import RootLayout from './RootLayout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseLayoutProps {}

const BaseLayout: FC<PropsWithChildren<BaseLayoutProps>> = (props) => {
  return (
    <>
      <RootLayout>
        <div className="layout">
          <Sidebar />
          <main>{props.children}</main>
        </div>
      </RootLayout>

      <style jsx>{`
        .layout {
          height: 100%;
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr;
        }

        main {
          height: 100%;
        }
      `}</style>
    </>
  );
};

BaseLayout.defaultProps = {};

export default BaseLayout;
