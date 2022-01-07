import { useState } from "react";
import Link from "next/link";
import Image from "./Image";

const PhotographerPreview = ({ order, photographer }) => {
  const [hovering, setHovering] = useState(false);

  const { name, title, slug, image } = photographer;
  const outlineOpacity = hovering ? "opacity-0" : "opacity-100";
  const filledOpacity = hovering ? "opacity-100" : "opacity-0";
  const defaultFontClassName = `text-5xl uppercase transition duration-700 ease-in-out break-words`;

  return (
    <Link href='/in-house/[slug]' as={`/in-house/${slug.current}`}>
      <a
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ height: "32rem" }}
        className={`flex flex-col w-full md:w-80 my-8 mx-auto transform transition duration-700 ease-in-out bg-black text-white`}
      >
        <div className='h-1/2 '>
          <Image image={image} alt={name} />
        </div>
        <div className=' h-1/2 flex items-center justify-center font-photographer-fx'>
          <div className='flex flex-col h-3/4 justify-around'>
            <div>
              <h4 className='uppercase text-center'>{title}</h4>
            </div>
            <div className='relative'>
              <h1
                className={`${defaultFontClassName} ${outlineOpacity} font-photographer`}
              >
                {name}
              </h1>
              <span
                className={`${defaultFontClassName} ${filledOpacity} absolute top-0 w-full font-photographer-fx`}
              >
                {name}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PhotographerPreview;
