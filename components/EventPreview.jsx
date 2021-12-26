import { useState } from "react";
import { formatDates } from "../utils/helpers";
import Link from "next/link";

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
      className={`transition duration-1000 ease-in-out ${opacity} ${width} mx-6 mb-24 text-black `}
    >
      <Link
        href={`/program/${slug.current}`}

        /*   state: { event }, */
      >
        <a className='flex flex-col font-book'>
          <h1 className='text-xl lg:text-3xl'>{title}</h1>
          <h5 className='text-xs lg:text-base'>
            {formatDates(timeStart, timeEnd)}
          </h5>
          <div className=''>
            <img
              className='object-cover'
              src={mainImage.asset.url}
              alt={mainImage.alt}
            />
          </div>
        </a>
      </Link>
    </article>
  );
};

export default EventPreview;