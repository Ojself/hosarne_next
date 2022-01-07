import { urlFor } from "../sanity";

const Image = ({ image, alt, className }) => {
  return (
    <img className={className} alt={alt} src={urlFor(image).auto("format")} />
  );
};

export default Image;
