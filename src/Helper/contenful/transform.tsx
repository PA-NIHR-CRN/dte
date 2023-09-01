import renderContent from "./modeller";

const transformContent = (response: any) => {
  const result: { [key: string]: any } = {};

  response.items.forEach((item: any) => {
    const key = item.fields.key;
    const value = item.fields.content;

    if (typeof value === "string") {
      // Directly assign the value if it's a string
      result[key] = value;
    } else {
      // Otherwise, call the renderContent function
      result[key] = renderContent(value);
    }
  });

  return result;
};

export default transformContent;
