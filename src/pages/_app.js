import Head from 'next/head'
import '@fontsource/titillium-web'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, height=device-height, initial-scale:1, user-scalable=no' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
