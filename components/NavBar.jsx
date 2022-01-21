import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { handleMailChimp } from "../utils/mailchimp";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";

const NavBar = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [showExtraMenuButton, setShowExtraMenuButton] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  console.log(loading, "mail loading");

  useEffect(() => {
    const userIsAtSingleEvent = router.pathname.includes("/program/");
    setShowExtraMenuButton(userIsAtSingleEvent);
    setIsOpen(!userIsAtSingleEvent);
  }, [router]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleError = (e) => {
    console.error("ERROR:\n", e);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      handleMailChimp(email);
    } catch (e) {
      handleError(e);
    }
    setLoading(false);
  };

  const amIActive = (path) => {
    return router.pathname === path;
  };

  const rotatedStyle = isOpen ? "transform rotate-45" : "";
  const menuButton = (
    <div className='top-4 left-6 absolute z-10'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='outline-none pointer-events-auto'
      >
        <div className='flex items-center text-base lg:text-2xl'>
          <HiPlus
            className={`transition duration-250 ease-in-out ${rotatedStyle}`}
          />
          <span className='ml-3 '>Meny</span>
        </div>
      </button>
    </div>
  );
  const navOpacity = isOpen ? "opacity-100" : "opacity-0";
  return (
    <header id='navbar' className='bg-white h-64 relative'>
      {showExtraMenuButton && menuButton}
      <nav
        className={`${navOpacity} transition duration-500 ease-in-out w-full flex flex-row justify-between pt-12 `}
      >
        <div className='flex flex-col uppercase text-sm lg:text-xl w-1/3 lg:w-2/3 pl-12 lg:pl-20'>
          <Link href='/'>
            <a
              className={`${
                amIActive("/") ? "" : "opacity-40"
              } hover:opacity-100 font-mirage-reg mb-2`}
            >
              Hos Arne
            </a>
          </Link>
          <Link href='/program'>
            <a
              className={`${
                amIActive("/program") ? "" : "opacity-40"
              } hover:opacity-100 font-mirage-reg`}
            >
              Program
            </a>
          </Link>
          <Link href='/leiligheten'>
            <a
              className={`${
                amIActive("/leiligheten") ? "" : "opacity-40"
              } hover:opacity-100 font-mirage-reg`}
            >
              Leiligheten
            </a>
          </Link>
          <Link href='/galleriet'>
            <a
              className={`${
                amIActive("/galleriet") ? "" : "opacity-40"
              } hover:opacity-100 font-mirage-reg`}
            >
              Galleriet
            </a>
          </Link>
          <Link href='/in-house'>
            <a
              className={`${
                amIActive("/in-house") ? "" : "opacity-40"
              } hover:opacity-100 font-mirage-reg`}
            >
              In-House
            </a>
          </Link>
          <Link href='/team'>
            <a
              className={`${
                amIActive("/team") ? "" : "opacity-40"
              } hover:opacity-100 font-mirage-reg`}
            >
              Team
            </a>
          </Link>
        </div>
        <div
          id='adress'
          className='flex flex-col-reverse text-sm lg:text-lg w-2/5 lg:w-1/3'
        >
          <form style={{ zIndex: 250 }} onSubmit={handleSubmit}>
            <label
              style={{ lineHeight: "1px" }}
              className='font-thin text:xs lg:text-sm'
            >
              Nyhetsbrev: <br className='' /> (Mail)
              <input
                type='text'
                style={{ backgroundColor: "transparent" }}
                id='email-input'
                className='w-3/7 lg:w-1/3 lg:ml-2 text-xs lg:text-lg focus:border-green-500 outline-none border-black border-t-0 border-l-0 border-r-0 border z-100'
                value={email}
                onChange={handleChange}
              />
            </label>
            {error && <p className='text-red-700'> Noe gikk galt </p>}
            <br />
          </form>
          <address className='not-italic font-thin text-xs lg:text-sm'>
            Gøteborggata 27B
            <br />
            0566 OSLO
            <br />
          </address>
          <div className='mb-2'>
            <p className='text-xs lg:text-sm font-mirage-reg'>
              ROM FOR KULTUR, KUNST
            </p>
            <p className='text-xs lg:text-sm font-mirage-reg'>
              {" "}
              & DET I MELLOM
            </p>
          </div>
        </div>
      </nav>
      <div id='hos_arne-fixed' className='font-swhong text-6xl w-56 lg:w-96'>
        {/* right sided logo here */}
      </div>
    </header>
  );
};

export default NavBar;
