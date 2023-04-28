import type { AppProps } from 'next/app';
import '@/styles/global.css';
import '@/styles/normalize.css';
import Layout from '@/components/layouts';
export default function App({ Component, pageProps }: AppProps) {
  // const a = 0;
  console.log(process.env.NODE_ENV);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
