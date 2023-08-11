import { createClient } from "contentful";

const space = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const accessToken = process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN;
const contentfulEnvironment = process.env.REACT_APP_CONTENTFUL_ENVIRONMENT;

if (!space || !accessToken || !contentfulEnvironment) {
  throw new Error("Contentful environment variables not set");
}

const client = createClient({
  space,
  accessToken,
  environment: contentfulEnvironment,
});

export default client;
