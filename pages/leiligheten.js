import { useEffect } from "react";
import groq from "groq";
import PortableText from "react-portable-text";
import Image from "../components/Image";
import Head from "next/head";
import { sanityClient } from "../sanity";
import { changeLayOutColors } from "../utils/helpers";

const Apartment = ({ apartment }) => {
  const { body_en, body_no, image, images } = apartment;
  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);
  const shouldRenderGalleryImages = images && images.length > 0;
  return (
    <>
      <Head>
        <title>Hos Arne - Leiligheten</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Hos Arne - Leiligheten' />
      </Head>
      <main className='font-book mb-12 mt-12 lg:mt-20'>
        <section className='flex flex-col lg:flex-row justify-center m-h-screen'>
          <div className='w-11/12 self-center lg:w-2/5 h-full'>
            <Image
              className='object-cover h-full w-full'
              image={image}
              alt='Leiligheten front'
            />
          </div>
          <div className='w-11/12 flex flex-col lg:self-auto lg:w-1/2 md:text-sm text-xs ml-6'>
            <hr
              style={{ borderTopWidth: "2px" }}
              className='lg:block hidden w-3/4 border-black border-1'
            />
            <div className='flex flex-col mt-6'>
              <div className='w-1/3'>
                <h1 className='text-xl lg:text-4xl font-mirage-reg'>
                  Leiligheten
                </h1>
              </div>
              <div className='text-xs lg:text-sm flex flex-col'>
                <PortableText
                  className='mb-6'
                  content={body_no}
                  renderContainerOnSingleChild={true}
                />
              </div>
            </div>
          </div>
        </section>
        <section className='mt-24'>
          {shouldRenderGalleryImages && (
            <>
              <h1 className='text-xl lg:text-4xl'>Fra Leiligheten</h1>
              <div className='my-5 grid grid-cols-1 lg:grid-cols-4 gap-4 mx-4 '>
                {images.map((image) => (
                  <a
                    key={image.asset.url}
                    href={image.asset.url}
                    className='hover:opacity-75'
                  >
                    <Image
                      image={image}
                      alt={image.alt}
                      objectFit='cover'
                      className='w-full h-full object-contain'
                    />
                    <h5>{image.title}</h5>
                  </a>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
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
    revalidate: 3600,
  };
}

export default Apartment;
