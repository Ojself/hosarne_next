import { useEffect, useState, useRef } from "react";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { AiOutlineArrowDown } from "react-icons/ai";
import sanityClient from "../../client";
import { changeLayOutColors, formatDates } from "../../utils/helpers";

function Event({ event }) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  if (!event || !event.length) {
    return <div>Loading...</div>;
  }

  const calculateOpacity = (offset) => {
    const limit = -150;
    return (offset - limit + 100) / 400;
  };
  const bodyRef = useRef(null);

  useScrollPosition(({ prevPos, currPos }) => {
    setScrollOpacity(calculateOpacity(currPos.y));
  });

  const backgroundColor = event.theme || "#fff";
  useEffect(() => {
    changeLayOutColors(backgroundColor, true);
  }, [backgroundColor]);

  const { body, timeStart, timeEnd, mainImage, title } = event[0];

  const shouldRenderBody = event.body && event.body.length;
  return (
    <>
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
      <main
        style={{ backgroundColor }}
        id='event-home'
        className='transition duration-1000 ease-in-out px-2 lg:px-44 relative mb-64 '
      >
        <section
          style={{ opacity: scrollOpacity }}
          className='h-44 lg:h-96 sticky top-64'
        >
          <h5 className='text-lg lg:text-3xl text-center font-thin'>
            {formatDates(timeStart, timeEnd)}
          </h5>
          <h1 className='text-3xl lg:text-6xl text-center font-extralight'>
            {title}
          </h1>
        </section>
        <img
          className='object-cover w-full h-auto mb-12'
          src={mainImage.asset.url}
          alt={mainImage.alt}
        />

        <section ref={bodyRef} id='event-description'>
          {shouldRenderBody && (
            <BlockContent
              className='font-extralight'
              blocks={body}
              renderContainerOnSingleChild
            />
          )}
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
                       isMainEvent,
                       facebookUrl,
                       body,
                       slug,
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
  console.log({ event });
  return {
    props: {
      event,
    },
  };
}
