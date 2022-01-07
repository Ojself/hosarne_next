import { createClient, createImageUrlBuilder } from "next-sanity";

const config = {
  projectId: "xqhdibw4",
  dataset: "production",
  apiVersion: "2021-07-25",
  useCdn: true,
};

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const sanityClient = createClient(config);
