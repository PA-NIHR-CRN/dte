import { useEffect, useState, createContext, ReactNode, useContext } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/cy";
import "moment/locale/en-gb";
import fetchAndTransformContent from "../Helper/contenful/fetchAndTransformContent";
import { AuthContext } from "./AuthContext";
import useAxiosFetch from "../hooks/useAxiosFetch";

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
  const { isAuthenticated } = useContext(AuthContext);
  const defaultLanguage = "en-GB";
  const [language, setLanguage] = useState<string>(Cookies.get("selectedLanguage") || defaultLanguage);
  const [content, setContent] = useState<any>(null); // Define a more specific type if known
  const [contentLoading, setContentLoading] = useState(true);
  const { i18n } = useTranslation();

  const [, putSelectedLocale] = useAxiosFetch(
    {},
    {
      manual: true,
      useCache: false,
    }
  );

  const contentfulFetch = (selectedLanguage: string) => {
    fetchAndTransformContent(selectedLanguage, 100)
      .then((transformedContent) => {
        setContent(transformedContent);
      })
      .catch(console.error)
      .finally(() => {
        setContentLoading(false);
      });
  };

  const changeLanguage = async (language: string) => {
    if (!language) return;

    await i18n.changeLanguage(language);
    moment.locale(language);
    Cookies.set("selectedLanguage", language);

    if (isAuthenticated()) {
      putSelectedLocale({
        url: `${process.env.REACT_APP_BASE_API}/participants/selectedlocale`,
        method: "PUT",
        data: {
          selectedLocale: language,
        },
      });
    }
  };

  useEffect(() => {
    setContentLoading(true);
    contentfulFetch(language);
    changeLanguage(language);
  }, [language]);

  return (
    <ContentContext.Provider value={{ content, contentLoading, language, setLanguage }}>
      {children}
    </ContentContext.Provider>
  );
}
