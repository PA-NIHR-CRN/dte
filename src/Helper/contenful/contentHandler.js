import fetchAndTransformContent from "./fetchAndTransformContent";

let content = null;

async function fetchContent() {
  content = await fetchAndTransformContent("en-GB", 500);
}

function getContent() {
  return content;
}

export { fetchContent, getContent };
