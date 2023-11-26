import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { myCustomImageBuilder, sanityClient } from "../sanity";

const SanityImage = ({ image, alt, className }) => {
  const imageProps = useNextSanityImage(sanityClient, image, {
    imageBuilder: myCustomImageBuilder,
  });

  return <Img className={className} {...imageProps} alt={alt} />;
};

export default SanityImage;
