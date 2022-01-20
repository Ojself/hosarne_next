import Image from "./Image";
import BlockContent from "@sanity/block-content-to-react";

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
        <Image
          className='object-contain w-full h-full'
          image={image}
          alt={image}
        />
      </div>
      <div className='w-full pl-2 lg:w-1/3 flex flex-col justify-center '>
        <h5 className='text-base lg:text-lg w-full font-mirage-med'>
          {tempName}
        </h5>
        <p className='text-sm lg:text-base mb-4'>{title}</p>
        <p className='text-xs'>{email}</p>
        <p className='text-xs mb-4'>{mobile}</p>
        {shouldRenderBody && (
          <BlockContent
            className=''
            blocks={body}
            renderContainerOnSingleChild={true}
          />
        )}
      </div>
    </div>
  );
};

export default TeamMember;
