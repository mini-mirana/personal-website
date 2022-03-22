import Head from 'next/head'
// import Loader from "../components/Loader"

export function Offline() {
  return (
    <div>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>Hi</div>
    </div>
  )
}

export default Offline
