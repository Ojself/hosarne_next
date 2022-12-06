import { useEffect, useState, useRef } from "react";
import groq from "groq";
import Head from "next/head";
import PortableText from "react-portable-text";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { AiOutlineArrowDown } from "react-icons/ai";

import Image from "../../components/Image";
import { sanityClient } from "../../sanity";
import { changeLayOutColors, formatDates } from "../../utils/helpers";

function Event({ event }) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  if (!event || !event.length) {
    return <div>Loading...</div>;
  }
  const { body, timeStart, timeEnd, mainImage, title, theme, images } =
    event[0];
  const shouldRenderGalleryImages = images && images.length > 0;

  const calculateOpacity = (offset) => {
    const limit = -150;
    return (offset - limit + 100) / 400;
  };
  const bodyRef = useRef(null);

  useScrollPosition(({ prevPos, currPos }) => {
    setScrollOpacity(calculateOpacity(currPos.y));
  });
  const backgroundColor = theme || "#fff";
  useEffect(() => {
    changeLayOutColors(backgroundColor, true);
  }, [backgroundColor]);

  const shouldRenderBody = body && body.length;
  return (
    <>
      <Head>
        <title>{title || ""} - Hos Arne</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content={`${title} - Hos Arne`} />
      </Head>
      <button
        style={{ opacity: scrollOpacity }}
        onClick={() => {
          const positionOfBody = bodyRef.current.offsetTop;
          window.scrollTo({ top: positionOfBody, behavior: "smooth" });
        }}
        className='animate-bounce fixed bottom-6 left-6 text-4xl font-thin outline-none z-10'
      >
        <AiOutlineArrowDown />
      </button>
      <main className='flex flex-col mt-0 lg:mt-20 mb-44 mx-1 lg:mx-0'>
        <section className='flex flex-col lg:flex-row justify-around mb-24'>
          <div className='w-full lg:w-2/5 flex justify-center'>
            <Image
              className='object-contain w-full h-full'
              image={mainImage}
              alt={mainImage.alt}
            />
          </div>
          <div className='w-full px-4 lg:w-2/5 '>
            <h1
              lang='no'
              className='hyphens text-6xl mt-2 lg:mt-0 lg:text-5xl xl:text-6xl font-mirage-reg '
            >
              {title}
            </h1>
            <h2 className='text-xl'>{formatDates(timeStart, timeEnd)}</h2>
            <hr className='my-4 w-1/6 border-2 border-black' />

            {shouldRenderBody && (
              <PortableText
                className='font-extralight lg:w-4/5'
                content={body}
                renderContainerOnSingleChild
              />
            )}
          </div>
        </section>
        <section
          ref={bodyRef}
          className='my-5 grid grid-cols-1 lg:grid-cols-4 gap-4 mx-4 '
        >
          {shouldRenderGalleryImages &&
            images.map((image) => (
              <a
                key={image.asset.url}
                href={image.asset.url}
                className='hover:opacity-75'
              >
                <Image
                  image={image}
                  alt={image.alt}
                  className='w-auto h-80 object-cover absolute'
                />
                <h5>{image.title}</h5>
              </a>
            ))}
        </section>
      </main>
    </>
  );
}

export default Event;

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == 'event' && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

const query = groq`*[_type == 'event' && slug.current == $slug] | order(timeStart asc){
                       title,
                       timeStart,
                       timeEnd,
                       'theme': theme->hex,
                       mainEvent,
                       body,
                       slug,
                       images[]{
                         asset->{
                            _id,
                            order,
                            url
                         },
                         title
                       },
                       mainImage{
                           asset->{
                               _id,
                               order,
                               url
                           },
                           alt
                       }
                   }`;

export async function getStaticProps(context) {
  const { slug } = context.params;
  const params = { slug };
  const event = await sanityClient.fetch(query, params);
  return {
    props: {
      event,
    },
    revalidate: 3600,
  };
}
