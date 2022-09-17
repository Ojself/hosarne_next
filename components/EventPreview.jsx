import { useState } from "react";
import Link from "next/link";
import Image from "./Image";
import { formatDates } from "../utils/helpers";

const EventPreview = ({ somethingIsHovering, handleEventHover, event }) => {
  console.log(event);
  const { mainImage, title, theme, mainEvent, timeEnd, timeStart, slug } =
    event;
  const [hovering, setHovering] = useState(false);

  const handleHovering = (bool, theme) => {
    handleEventHover(bool, theme);
    setHovering(bool);
  };
  const opacity =
    !hovering && somethingIsHovering ? "opacity-10" : "opacity-100";
  const width = mainEvent ? "w-full lg:w-2/5" : "w-full lg:w-1/4";

  return (
    <article
      onMouseEnter={() => handleHovering(true, theme)}
      onMouseLeave={() => handleHovering(false)}
      className={`transition duration-1000 ease-in-out ${opacity} ${width} mx-2 lg:mx-6 mb-24 text-black`}
    >
      <Link href={`/program/${slug.current}`}>
        <a className='flex flex-col font-book'>
          <h1 className='text-xl lg:text-3xl font-mirage-reg'>{title}</h1>
          <h2 className='text-xs lg:text-base'>
            {formatDates(timeStart, timeEnd)}
          </h2>
          <figure>
            <Image image={mainImage} />
          </figure>
        </a>
      </Link>
    </article>
  );
};

export default EventPreview;
