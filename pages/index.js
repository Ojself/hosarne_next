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
      <main className='relative h-screen'>
        <Image
          className='hero bg-black object-cover flex justify-center items-center grayscale w-screen h-screen'
          src={door}
          alt='Picture of the main door'
          layout='fill'
        />
      </main>
    </div>
  );
}
