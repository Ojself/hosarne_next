import { useState } from "react";
import Link from "next/link";
import Image from "./Image";
import { formatDates } from "../utils/helpers";

const EventPreview = ({ somethingIsHovering, handleEventHover, event }) => {
  const { mainImage, title, theme, isMainEvent, timeEnd, timeStart, slug } =
    event;
  const [hovering, setHovering] = useState(false);

  const handleHovering = (bool, theme) => {
    handleEventHover(bool, theme);
    setHovering(bool);
  };
  const opacity =
    !hovering && somethingIsHovering ? "opacity-10" : "opacity-100";
  const width = isMainEvent ? "w-full lg:w-2/5" : "w-full lg:w-1/4";

  return (
    <article
      onMouseEnter={() => handleHovering(true, theme)}
      onMouseLeave={() => handleHovering(false)}
      className={`transition duration-1000 ease-in-out ${opacity} ${width} mx-2 lg:mx-6 mb-24 text-black`}
    >
      <Link href={`/program/${slug.current}`}>
        <a className='flex flex-col font-book'>
          <h1 className='text-xl lg:text-3xl'>{title}</h1>
          <h5 className='text-xs lg:text-base'>
            {formatDates(timeStart, timeEnd)}
          </h5>
          <figure>
            <Image image={mainImage} className='' />
          </figure>
        </a>
      </Link>
    </article>
  );
};

export default EventPreview;
