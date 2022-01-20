import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";

const TeamMember = ({ name, title, email, mobile, body, image }) => {
  const shouldRenderBody = body && body.length > 0;
  return (
    <div className='flex flex-col lg:flex-row h-auto w-100 my-6'>
      <div className='w-full lg:w-1/3'>
        <Image
          className='object-cover'
          layout='responsive'
          height='300'
          width='300'
          src={image.asset.url}
          alt={image.alt}
        />
      </div>
      <div className='w-full pl-2 lg:w-1/3 flex flex-col justify-center text-sm '>
        <h5 className='text-lg lg:text-xl '>{name}</h5>
        <p className='text-base lg:text-lg mb-4'>{title}</p>
        <p>{email}</p>
        <p className='mb-4'>{mobile}</p>
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
