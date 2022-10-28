import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import BaseLayout from '../lib/layouts/DashboardLayout';
/* TODO: Use globally shared assets */
import '../lib/styles/reset.scss';
import '../lib/styles/root.scss';
import '../lib/styles/global.scss';
import '../lib/styles/theme-dark.root.scss';
import '../lib/styles/theme-light.root.scss';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);

  return getLayout(
    <>
      <Head>
        <title>Welcome to work!</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default App;
