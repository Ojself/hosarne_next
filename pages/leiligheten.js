import { useEffect } from "react";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import Image from "../components/Image";
import { sanityClient } from "../sanity";
import { changeLayOutColors } from "../utils/helpers";

const Apartment = ({ apartment }) => {
  const { body_en, body_no, image, images } = apartment;
  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);
  const shouldRenderGalleryImages = images && images.length > 0;
  return (
    <main className='font-book mb-12'>
      <section className='flex flex-col lg:flex-row justify-around m-h-screen'>
        <div className='w-11/12 self-center lg:w-1/2 '>
          <Image image={image} alt='Leiligheten front' />
        </div>
        <div className='w-11/12 flex flex-col self-center lg:self-auto lg:w-5/12 md:text-sm text-xs mt-2 lg:mt-24'>
          <div className='w-full'>
            <BlockContent
              className='mb-6'
              blocks={body_no}
              renderContainerOnSingleChild={true}
            />
            <BlockContent
              className=''
              blocks={body_en}
              renderContainerOnSingleChild={true}
            />
          </div>
        </div>
      </section>
      <section className='my-5 grid grid-cols-1 lg:grid-cols-4 gap-4 mx-4 '>
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
                className='w-full h-64 object-cover'
              />
              <h5>{image.title}</h5>
            </a>
          ))}
      </section>
    </main>
  );
};

const query = groq`*[_type == "apartment"] | order(timeStart asc){
                       body_no,
                       body_en,
                       images[]{
                         asset->{
                            _id,
                            order,
                            url
                         },
                         title
                       },
                       image{
                           asset->{
                               _id,
                               order,
                               url
                           },
                           alt
                       }
                   }`;

export async function getStaticProps(context) {
  const data = await sanityClient.fetch(query);
  return {
    props: {
      apartment: data[0],
    },
    revalidate: 30,
  };
}

export default Apartment;
