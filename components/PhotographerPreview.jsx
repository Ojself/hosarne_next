import { useState } from "react";
import Link from "next/link";
import Image from "./Image";

const getFontSize = (str) => {
  return str.length > 10 ? "text-3xl" : "text-5xl";
};

const Wrapper = ({ slug, component }) => {
  if (slug && slug.current) {
    return (
      <Link href='/in-house/[slug]' as={`/in-house/${slug.current}`}>
        {component}
      </Link>
    );
  }
  return <>{component}</>;
};

const PhotographerPreview = ({ order, photographer }) => {
  const [hovering, setHovering] = useState(false);
  const { name, title, slug, image } = photographer;
  const defaultFontClassName = `${getFontSize(name)} uppercase break-words`;
  const scaleStyle = hovering ? "scale-105" : "scale-100";
  const component = (
    <a
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ height: "32rem" }}
      className={`flex flex-col w-full md:w-80 my-8 mx-auto transform transition duration-700 ease-in-out bg-black text-white`}
    >
      <div className='h-1/2 overflow-hidden'>
        <Image
          className={`object-cover w-full h-full ${scaleStyle} transition ease-in-out duration-500`}
          image={image}
          alt={name}
        />
      </div>
      <div className=' h-1/2 flex items-center justify-center font-photographer-fx'>
        <div className='flex flex-col h-3/4 justify-around'>
          <div>
            <h4 className='uppercase text-center'>{title}</h4>
          </div>
          <div className='relative'>
            <h1 className={`${defaultFontClassName} font-mirage-reg`}>
              {name}
            </h1>
          </div>
        </div>
      </div>
    </a>
  );

  return <Wrapper slug={slug} component={component} />;
};

export default PhotographerPreview;

/* const oldPreview = (
  <Link href='/in-house/[slug]' as={`/in-house/${slug.current}`}>
    <a
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ height: "32rem" }}
      className={`flex flex-col w-full md:w-80 my-8 mx-auto transform transition duration-700 ease-in-out bg-black text-white`}
    >
      <div className='h-1/2'>
        <Image
          className='object-cover w-full h-full'
          image={image}
          alt={name}
        />
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
); */
