import { useEffect } from "react";
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import Image from "../../components/Image";
import { sanityClient } from "../../sanity";
import { changeLayOutColors } from "../../utils/helpers";

function Photographer({ photographer }) {
  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);
  if (!photographer || !photographer.length) {
    return <div>Loading...</div>;
  }
  const { name, title, email, mobile, body, image, images } = photographer[0];
  const shouldRenderGalleryImages = images && images.length > 0;
  const shouldRenderBody = body && body.length;
  return (
    <main className='flex flex-col mt-20 mb-44'>
      <section className='flex flex-row justify-around mb-24'>
        <div className='w-1/3'>
          <h1 className='text-6xl'>{name}</h1>
          <h1 className='text-xl'>{title}</h1>
          <h1 className='text-sm'>
            <a href={`mailto:${email}`}>{email}</a>
          </h1>
          <h1 className='text-sm'>{mobile}</h1>
          <hr className='my-4 w-1/6 border-2 border-black' />
          {shouldRenderBody && (
            <BlockContent
              className='font-extralight'
              blocks={body}
              renderContainerOnSingleChild
            />
          )}
        </div>
        <div className='w-2/5'>
          <Image image={image} alt={image.alt} />
        </div>
      </section>
      <section className='my-5 grid grid-cols-1 lg:grid-cols-4 gap-4 mx-4 '>
        {shouldRenderGalleryImages &&
          images.map((image) => {
            return (
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
            );
          })}
      </section>
    </main>
  );
}

const query = groq`*[_type == "photographer" && slug.current == $slug] | order(order asc){
                       name,
                       title,
                       email,
                       mobile,
                       slug,
                       body,
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

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "photographer" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const params = { slug };
  const photographer = await sanityClient.fetch(query, params);
  return {
    props: {
      photographer,
    },
    revalidate: 30,
  };
}

export default Photographer;
