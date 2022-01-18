import "../styles/globals.css";
import "../styles/home.css";
import "../styles/index.css";

import groq from "groq";
import { sanityClient } from "../sanity";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps, data }) {
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
  console.log("hello?");
  const data = await sanityClient.fetch(query);
  console.log(data, "data");
  return {
    props: {
      data,
    },
    revalidate: 30,
  };
}
