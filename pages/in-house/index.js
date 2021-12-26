import { useEffect } from "react";
import groq from 'groq'
import sanityClient from "../../client";
import PhotographerPreview from "../../components/PhotographerPreview";
import colorPalette from "../../utils/photographerPalette";
import { changeLayOutColors } from "../../utils/helpers";
const InHouse = ({photographers}) => {
  const randomStart = Math.floor(Math.random() * colorPalette.length);

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
    <main className='flex flex-col items-center'>
      <div className='mt-6 flex flex-wrap w-full px-4 lg:px-0'>
        {photographers.map((photographer, i) => {
          const colorPaletteIndex = (randomStart + i) % colorPalette.length;
          return (
            <>
              <PhotographerPreview
                key={photographer.name}
                backgroundColor={
                  colorPalette[colorPaletteIndex].backgroundColor
                }
                color={colorPalette[colorPaletteIndex].color}
                photographer={photographer}
                slug={""}
              />
            </>
          );
        })}
      </div>
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
                   }`


export async function getStaticProps(context) {
  const photographers = await sanityClient.fetch(query, { })
  return {
    props: {
      photographers
    }
  }
}

export default InHouse;
