import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "xqhdibw4",
  dataset: "production",
  apiVersion: "2021-07-25",
  useCdn: true,
});
