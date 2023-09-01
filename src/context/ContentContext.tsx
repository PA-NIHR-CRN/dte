import { useEffect, useState, createContext, ReactNode } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/cy"; // Welsh
import "moment/locale/en-gb";
import fetchAndTransformContent from "../Helper/contenful/fetchAndTransformContent";

// Define the type for the content context value
interface ContentContextType {
  content: any; // Define a more specific type if known
  contentLoading: boolean;
  language: string;
  setLanguage: (language: string) => void;
}

export const ContentContext = createContext<ContentContextType>({} as ContentContextType);

interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const defaultLanguage = "en-GB";
  const [language, setLanguage] = useState<string>(Cookies.get("selectedLanguage") || defaultLanguage);
  const [content, setContent] = useState<any>(null); // Define a more specific type if known
  const [contentLoading, setContentLoading] = useState(true);
  const { i18n } = useTranslation();

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
    moment.locale(language);
  };

  useEffect(() => {
    setContentLoading(true);
    fetchAndTransformContent(language, 100)
      .then((transformedContent) => {
        setContent(transformedContent);
        return changeLanguage(language);
      })
      .catch(console.error)
      .finally(() => {
        setContentLoading(false);
      });
  }, [language]);

  return (
    <ContentContext.Provider value={{ content, contentLoading, language, setLanguage }}>
      {children}
    </ContentContext.Provider>
  );
}
