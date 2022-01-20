import { useEffect } from "react";
import groq from "groq";
import { sanityClient } from "../../sanity";
import PhotographerPreview from "../../components/PhotographerPreview";
import { changeLayOutColors } from "../../utils/helpers";
const InHouse = ({ photographers }) => {
  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);
  if (!photographers.length) {
    return (
      <main>
        <div>Loading...</div>
      </main>
    );
  }
  return (
    <main className='mb-32 w-full flex justify-around'>
      <section className='w-full lg:w-11/12 mt-6 flex flex-row-reverse flex-wrap px-4 lg:px-0'>
        {photographers.map((photographer, i) => {
          return (
            <PhotographerPreview
              key={photographer.name}
              order={i}
              backgroundColor='red'
              color='blue'
              photographer={photographer}
            />
          );
        })}
      </section>
    </main>
  );
};

const query = groq`*[_type == "photographer"] | order(order asc){
                       name,
                       title,
                       slug,
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
  const photographers = await sanityClient.fetch(query, {});
  return {
    props: {
      photographers,
    },
    revalidate: 60,
  };
}

export default InHouse;
