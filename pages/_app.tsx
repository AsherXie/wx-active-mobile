import type { AppProps } from 'next/app'
import '../styles/global.css'
import '../styles/normalize.css'
import Layout from '@/components/layouts'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}
