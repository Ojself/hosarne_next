import Head from "next/head";
import { useEffect } from "react";
import { changeLayOutColors } from "../utils/helpers";
import Image from "next/image";
import door from "../imgs/door.jpeg";

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
          className='hero bg-black grayscale m-w-screen m-h-screen'
          src={door}
          priority={true}
          layout='fill'
          objectFit='cover'
          alt='Picture of the main door'
        />
      </main>
    </div>
  );
}
