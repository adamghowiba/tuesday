import React, { FC, PropsWithChildren } from 'react';
import { Theme } from '../types/theme';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RootLayoutProps {}

const RootLayout: FC<PropsWithChildren<RootLayoutProps>> = (props) => {
  const theme: Theme = 'light';

  return (
    <>
      <div className={`root theme--${theme}`}>{props.children}</div>

      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

RootLayout.defaultProps = {};

export default RootLayout;
