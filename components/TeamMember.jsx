import PortableText from "react-portable-text";
import SanityImage from "./SanityImage";

const TeamMember = ({ name, title, email, mobile, body, image }) => {
  const shouldRenderBody = body && body.length > 0;
  /* Super hack ;) */
  const tempName =
    name === "Maria Katarina T. Michelsen" ? (
      <>
        Maria Katarina <br /> T. Michelsen
      </>
    ) : (
      name
    );
  return (
    <div className='flex flex-col lg:flex-row h-auto w-100 '>
      <div className='w-full lg:w-1/3'>
        <SanityImage image={image} alt={image} />
      </div>
      <div className='w-full pl-2 lg:w-1/3 flex flex-col justify-center '>
        <h1 className='text-base lg:text-lg w-full font-mirage-med'>
          {tempName}
        </h1>
        <p className='text-sm lg:text-base mb-4'>{title}</p>
        <p className='text-xs'>{email}</p>
        {!!shouldRenderBody && (
          <PortableText content={body} renderContainerOnSingleChild={true} />
        )}
      </div>
    </div>
  );
};

export default TeamMember;
