import transformContent from "./transform";
import client from "./client";

const fetchAndTransformContent = async (locale: string, limit: number) => {
  let skip = 0;
  let allEntries: any[] = [];

  while (true) {
    const response = await client.getEntries({ locale, skip, limit });
    allEntries = [...allEntries, ...response.items];
    skip += limit;
    if (skip >= response.total) break;
  }

  return transformContent({ items: allEntries });
};

export default fetchAndTransformContent;
