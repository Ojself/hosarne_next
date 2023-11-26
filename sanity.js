import { createClient, createImageUrlBuilder } from "next-sanity";

const config = {
  projectId: "xqhdibw4",
  dataset: "production",
  apiVersion: "2021-07-25",
  useCdn: true,
};

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const myCustomImageBuilder = (imageUrlBuilder, options) => {
  return imageUrlBuilder
    .width(
      options.width || Math.min(options.originalImageDimensions.width, 800)
    )
    .fit("max");
};

export const sanityClient = createClient(config);
