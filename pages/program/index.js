import { useState, useEffect } from "react";
import groq from "groq";
import Head from "next/head";
import { sanityClient } from "../../sanity";
import EventPreview from "../../components/EventPreview";
import { changeLayOutColors, getDateFromTenDaysAgo } from "../../utils/helpers";
import Link from "next/link";

const Program = ({ events }) => {
  const [somethingIsHovering, setSomethingIsHovering] = useState(false);
  const [theme, setTheme] = useState("#fff");

  useEffect(() => {
    changeLayOutColors(theme, false);
  }, [somethingIsHovering]);
  const handleEventHover = (bool, theme = "") => {
    setSomethingIsHovering(bool);
    setTheme(theme);
  };
  return (
    <>
      <Head>
        <title>Program - Hos Arne</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Program - Hos Arne' />
      </Head>
      <main id='events-home' className='text-white'>
        <section className='flex flex-wrap mt-12 lg:mt-20 lg:mb-32'>
          {events.map((event) => (
            <EventPreview
              key={event.title}
              handleEventHover={handleEventHover}
              somethingIsHovering={somethingIsHovering}
              event={event}
            />
          ))}
        </section>
        <section className='mb-16 mx-2 lg:mx-6 text-black hover:underline'>
          <Link href='/program/arkiv'>Se tidligere arrangementer</Link>
        </section>
      </main>
    </>
  );
};

const query = groq`*[_type == "event" && timeStart > $tenDaysAgo] | order(timeStart desc){
                       title,
                       timeStart,
                       timeEnd,
                       "theme": theme->hex,
                       mainEvent,
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
  const tenDaysAgo = getDateFromTenDaysAgo();
  const params = { tenDaysAgo };
  const events = await sanityClient.fetch(query, params);
  return {
    props: {
      events,
    },
    revalidate: 3600,
  };
}

export default Program;
