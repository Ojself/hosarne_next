import Head from "next/head";
import { useEffect } from "react";
import { changeLayOutColors } from "../utils/helpers";
import Image from "next/image";
import door from "../imgs/door2.jpeg";

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
      <main className='hero'>
        <Image
          className='bg-black grayscale'
          src={door}
          priority={true}
          layout='responsive'
          alt='Picture of the main door'
        />
      </main>
    </div>
  );
}
