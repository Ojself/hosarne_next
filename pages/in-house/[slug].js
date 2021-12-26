import { useEffect } from "react";
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import sanityClient from "../../client";
import { changeLayOutColors } from "../../utils/helpers";

function Photographer({ photographer }) {
  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);
  if (!photographer || !photographer.length) {
    return <div>Loading...</div>;
  }
  const { name, title, email, mobile, body, image, images } = photographer[0];

  return (
    <div className='flex flex-col'>
      <h1>{name}</h1>
      <h1>{title}</h1>
      <h1>{email}</h1>
      <h1>{mobile}</h1>
      <div>
        <img src={image.asset.url} alt={image.alt} />
      </div>
      <BlockContent
        className='font-extralight'
        blocks={body}
        renderContainerOnSingleChild
      />
      <div>
        {images.map((image) => (
          <img src={image.asset.url} alt={image.alt} />
        ))}
      </div>
    </div>
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
  console.log({ photographer });
  return {
    props: {
      photographer,
    },
  };
}

export default Photographer;
