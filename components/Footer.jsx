import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const socialIcons = (
    <div className='bg-transparent'>
      <SocialIcon
        className='h-8'
        style={{ height: "2.5em" }}
        bgColor='#eee'
        fgColor='#000'
        url='https://www.instagram.com/hos_arne/'
      />
      <SocialIcon
        style={{ height: "2.5em" }}
        bgColor='#eee'
        fgColor='#000'
        url='https://www.facebook.com/hosarne'
      />
    </div>
  );
  const adress = (
    <address className='not-italic'>
      Gøteborggata 27B <br />
      0655 Oslo
    </address>
  );
  return (
    <footer
      id='footer'
      className='flex h-60 w-full items-center justify-around bg-white text-base'
    >
      <div>
        <div className='uppercase text-xs text-center lg:text-base mb-2'>
          Hos Arne
        </div>
        <div className='lg:text-base text-xs text-center lg:hidden mb-2'>
          {adress}
        </div>
        <div className='flex justify-around lg:hidden'>{socialIcons}</div>
      </div>
      <div className='w-40 hidden lg:block'>
        <hr className='w-full mt-4 border-black ' />
      </div>
      <div className='text-xs hidden lg:block'>{adress}</div>
      <div className='hidden lg:flex'>{socialIcons}</div>
      <div className='flex w-2/5 lg:w-5/12 lg:flex-row flex-col justify-around'>
        <div className='text-sm mb-2'>
          MK / Daglig leder <br />
          mk@hos-arne.no <br />
          +47 41259913 <br />
        </div>
        <div className='text-sm mb-2'>
          Cat / Gallerist & kurator
          <br />
          cat@hos-arne.no
          <br />
          +47 46427881
          <br />
        </div>
        <div className='text-sm mb-2'>
          Alex / Veileder
          <br />
          alex@hos-arne.no
          <br />
          +47 93869353
        </div>
      </div>
    </footer>
  );
};

export default Footer;
