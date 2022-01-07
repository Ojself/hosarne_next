import { useEffect } from "react";
import Image from "next/image";
import { changeLayOutColors } from "../utils/helpers";

const Gallery = () => {
  useEffect(() => {
    changeLayOutColors("#fff");
  }, []);
  return (
    <main className='font-book'>
      <section className='flex flex-col lg:flex-row items-center justify-around h-full'>
        <div className='w-4/5 lg:w-5/12 relative h-screen '>
          <Image
            layout='fill'
            alt='Galleriet front'
            src='https://picsum.photos/1200/1200'
            className='object-cover '
          />
        </div>
        <div className='w-4/5 lg:w-5/12 flex flex-col justify-center '>
          <p className='mb-6'>
            Galleriet Hos Arne er et unikt space som ligger åpent eksponert fra
            Leiligheten/Stuen, og vice versa. Galleriet har som et anti-konsept
            å vise samtidskunst uten satte krav, annet enn at kunsten er av
            aktører og kunstnere som vi opplever at klarer å romme det luftige
            lokalet på tilsammen 140 kvm. fordelt over to rom med naturlig
            overlys fra glasstak svevende opptil 6 m. høyt. Hos Arne vil du
            oppleve en eklektisk miks av kunst. Variert, uforutsigbart, åpent.
          </p>
          <p className='italic'>
            The Gallery Hos Arne is a unique space that is openly exposed from
            The Apartment / Living Room, and vice versa. The gallery follows an
            anti-concept, aiming to show contemporary art without any set of
            requirements, other than a notion that the art exhibited is done by
            artists that we believe manages to fully house the spacious venue of
            a total of 140 sqm. diveded into two rooms with natural skylight
            from glass ceilings hovering up to 6 m. high. At Arne’s place you
            will experience an eclectic mix of art. Varied, unpredictable, open.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
