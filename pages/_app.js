import "../styles/globals.css";
import "../styles/home.css";
import "../styles/index.css";

import { useEffect } from "react";
import { useRouter } from "next/router";

import * as ga from "../utils/analytics";

import groq from "groq";
import { sanityClient } from "../sanity";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
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
      <Footer />
    </>
  );
}

export default MyApp;

const query = groq`*[_type == 'footer']{
                       name,
                       title,
                       email,
                       mobile
                   }`;

export async function getStaticProps(context) {
  const data = await sanityClient.fetch(query);
  return {
    props: {
      data,
    },
    revalidate: 30,
  };
}
