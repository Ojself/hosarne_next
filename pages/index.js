import Head from "next/head";
import { useEffect } from "react";
import { changeLayOutColors } from "../utils/helpers";
import Image from "next/image";
import door from "../imgs/door.webp";

export default function Home() {
  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);
  return (
    <div>
      <Head>
        <title>Hos Arne</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Hos Arne' />
      </Head>
      <main>
        <Image
          style={{ width: "100vw", height: "100vh" }}
          className='bg-black object-cover flex justify-center items-center grayscale hero'
          src={door}
          alt='Picture of the main door'
        />
      </main>
    </div>
  );
}
