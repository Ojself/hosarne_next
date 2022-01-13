import { useState, useEffect } from "react";
import groq from "groq";
import { sanityClient } from "../../sanity";
import EventPreview from "../../components/EventPreview";
import { changeLayOutColors } from "../../utils/helpers";

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
    </main>
  );
};

const query = groq`*[_type == "event" && timeStart > now()] | order(timeStart asc){
                       title,
                       timeStart,
                       timeEnd,
                       "theme": theme->hex,
                       isMainEvent,
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
  const events = await sanityClient.fetch(query);
  return {
    props: {
      events,
    },
    revalidate: 30,
  };
}

export default Program;
