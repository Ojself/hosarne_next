import "../styles/globals.css";
import "../styles/home.css";
import "../styles/index.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import * as ga from "../utils/analytics";

import groq from "groq";
import { sanityClient } from "../sanity";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const query = groq`*[_type == 'footer']{
                   name,
                   title,
                   email,
                   mobile
               }`;

const MyApp = ({ Component, pageProps }) => {
  const [footerData, setFooterData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchFooterData = async () => {
      const data = await sanityClient.fetch(query);
      return data;
    };
    if (!footerData) {
      fetchFooterData().then((data) => {
        setFooterData(data);
      });
    }

    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer data={footerData} />
    </>
  );
};

export default MyApp;
