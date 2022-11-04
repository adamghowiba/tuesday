import React, { FC, PropsWithChildren } from 'react';
import { Theme } from '../types/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RootLayoutProps extends PropsWithChildren {}

const RootLayout: FC<RootLayoutProps> = (props) => {
  const theme: Theme = 'light';
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: true } },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className={`root theme--${theme}`}>{props.children}</div>
      </QueryClientProvider>

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
