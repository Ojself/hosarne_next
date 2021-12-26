import Head from 'next/head'
import { useEffect } from "react";
import { changeLayOutColors } from "../utils/helpers";

export default function Home() {
  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);
  return (
    <div >
      <Head>
        <title>Hos Arne</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='text-white bg-black flex justify-center items-center hero '></main>
    </div>
  )
}
