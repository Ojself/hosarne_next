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
        className={`${navOpacity} transition duration-500 ease-in-out w-full flex flex-row justify-around pt-12`}
      >
        <div className='flex flex-col uppercase text-sm lg:text-xl font-roman '>
          <Link className='mb-4 ' href='/'>
            <a>Hos Arne</a>
          </Link>
          <Link
            className={(isActive) => (isActive ? "" : "opacity-40")}
            href='/leiligheten'
          >
            <a>Leiligheten</a>
          </Link>
          <Link
            className={(isActive) => (isActive ? "" : "opacity-40")}
            href='/galleriet'
          >
            <a>Galleriet</a>
          </Link>
          <Link
            className={(isActive) => (isActive ? "" : "opacity-40")}
            href='/program'
          >
            <a>Program</a>
          </Link>
          <Link
            className={(isActive) => (isActive ? "" : "opacity-40")}
            href='/in-house'
          >
            <a>In-House</a>
          </Link>
          <Link
            className={(isActive) => (isActive ? "" : "opacity-40")}
            href='/team'
          >
            <a>Team</a>
          </Link>
        </div>
        <div>{/* Empty by design */}</div>
        <div>{/* Empty by design */}</div>
        <div id='adress' className='flex flex-col font-book text-sm lg:text-lg'>
          <h1>Adresse:</h1>
          <address className='not-italic mb-4'>
            Gøteborggata 27B
            <br />
            0566 OSLO
            <br />
            <div>
              <p>@hos_arne</p>
            </div>
          </address>

          <form style={{ zIndex: 250 }} onSubmit={handleSubmit}>
            <label>
              Nyhetsbrev: <br /> (Mail)
              <input
                type='text'
                style={{ backgroundColor: "transparent" }}
                id='email-input'
                className='ml-2 focus:border-green-500 outline-none border-black border-t-0 border-l-0 border-r-0 border-2 z-100'
                value={email}
                onChange={handleChange}
              />
            </label>
            {error && <p className='text-red-700'> Noe gikk galt </p>}
            <br />
          </form>
        </div>
      </nav>
      <div id='hos_arne-fixed' className='font-swhong text-6xl w-56 lg:w-96'>
        {/* right sided logo here */}
      </div>
    </header>
  );
};

export default NavBar;