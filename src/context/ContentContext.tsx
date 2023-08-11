import { useEffect, useState, createContext, ReactNode } from "react";
import Cookies from "js-cookie";
import transformContent from "../Helper/contenful/transform";
import client from "../Helper/contenful/client";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/cy"; // Welsh
import "moment/locale/en-gb";

// Define the type for the content context value
interface ContentContextType {
  content: any; // Define a more specific type if known
  contentLoading: boolean;
  language: string;
  setLanguage: (language: string) => void;
}

export const ContentContext = createContext<ContentContextType>(
  {} as ContentContextType,
);

interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const defaultLanguage = "en-GB";
  const [language, setLanguage] = useState<string>(
    Cookies.get("selectedLanguage") || defaultLanguage,
  );
  const [content, setContent] = useState<any>(null); // Define a more specific type if known
  const [contentLoading, setContentLoading] = useState(true);
  const { i18n } = useTranslation();

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
    moment.locale(language);
  };

  async function fetchAllEntries(locale: string) {
    let skip = 0;
    const limit = 100; // You can adjust this value
    let allEntries: any[] = []; // Define a more specific type if known

    while (true) {
      const response = await client.getEntries({ locale, skip, limit });
      allEntries = [...allEntries, ...response.items];
      skip += limit;
      if (skip >= response.total) break;
    }

    return allEntries;
  }

  useEffect(() => {
    setContentLoading(true);
    Cookies.set("selectedLanguage", language);
    fetchAllEntries(language)
      .then((entries) => {
        const transformedContent = transformContent({ items: entries }); // Modify transformContent if needed
        setContent(transformedContent);
        return changeLanguage(language);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setContentLoading(false);
      });
  }, [language]);

  return (
    <ContentContext.Provider
      value={{ content, contentLoading, language, setLanguage }}
    >
      {children}
    </ContentContext.Provider>
  );
}
