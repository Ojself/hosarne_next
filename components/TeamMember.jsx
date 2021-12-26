const BlockContent = require("@sanity/block-content-to-react");

const TeamMember = ({ name, title, email, mobile, body, image }) => {
  return (
    <div className='flex lg:flex-row flex-col justify-around font-roman my-6'>
      <div className='w-full lg:w-1/3'>
        <img src={image.asset.url} alt={image.alt} />
      </div>
      <div className='w-full lg:w-1/3 flex flex-col justify-center'>
        <h5 className='text-xl font-black'>{name}</h5>
        <p className='text-lg mb-4'>{title}</p>
        <p>{email}</p>
        <p className='mb-4'>{mobile}</p>
        <BlockContent
          className=''
          blocks={body}
          renderContainerOnSingleChild={true}
        />
      </div>
    </div>
  );
};

export default TeamMember;
