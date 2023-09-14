import { useState, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { JWTDeCode, AuthContextProps, SessionExpiryInfo } from "../types/AuthTypes";
import useAxiosFetch from "../hooks/useAxiosFetch";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const sessionRefreshCheckInterval = 10 * 1000;

export const AuthProvider = (props: { children: any }) => {
  const [authenticatedEmail, setAuthenticatedEmail] = useState<string | null>(null);
  const [authenticatedEmailVerified, setAuthenticatedEmailVerified] = useState<boolean | null>(null);
  const [authenticatedMobile, setAuthenticatedMobile] = useState<string | null>(null);
  const [authenticatedMobileVerified, setAuthenticatedMobileVerified] = useState<boolean | null>(null);
  const [authenticatedUserId, setAuthenticatedUserId] = useState<string | null>(null);
  const [authenticatedFirstname, setAuthenticatedFirstname] = useState<string | null>(null);
  const [authenticatedLastname, setAuthenticatedLastname] = useState<string | null>(null);

  const [isNhsLinkedAccount, setIsNhsLinkedAccount] = useState<boolean>(false);
  const [token, setToken] = useState<string | null | undefined>(null);
  const [isInNHSApp, setIsInNHSApp] = useState<boolean>(false);
  const [mfaDetails, setMfaDetails] = useState<string>("");
  const [enteredMfaMobile, setEnteredMfaMobile] = useState<string>("");
  const [userMfaEmail, setUserMfaEmail] = useState<string>("your email address");

  const baseUrl = process.env.REACT_APP_BASE_API;

  const [{ loading: logoutLoading }, logout] = useAxiosFetch(
    {
      method: "POST",
      url: `${baseUrl}/users/logout`,
      withCredentials: true,
    },
    { useCache: false, manual: true }
  );

  const [{ loading: refreshSessionTokenLoading }, refreshSessionToken] = useAxiosFetch(
    {
      method: "GET",
      url: `${baseUrl}/users/refreshsession`,
      withCredentials: true,
    },
    { useCache: false, manual: true }
  );

  useEffect(() => {
    if (window.nhsapp.tools.isOpenInNHSApp()) {
      setIsInNHSApp(true);
    } else {
      setIsInNHSApp(false);
    }

    const interval = setInterval(() => {
      const session = getSessionExpiry();
      // eslint-disable-next-line no-console
      console.debug(`refreshSession check: ${new Date().toISOString()}`);
      // eslint-disable-next-line no-console
      console.debug(`session.remaining: ${session.remaining}`);
      if (session?.isLoggedIn && !refreshSessionTokenLoading) {
        refreshSessionToken();
      }
    }, sessionRefreshCheckInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const saveTokenValuesToMemory = (userToken: string) => {
    let decodedToken: JWTDeCode | null = null;
    try {
      decodedToken = jwtDecode(userToken);
      // eslint-disable-next-line no-empty
    } catch {}

    if (decodedToken) {
      const epochNow = Math.floor(new Date().getTime() / 1000);
      const issuedAt = decodedToken?.iat;
      if (epochNow - issuedAt < 30) {
        const userId = decodedToken?.["cognito:username"] || decodedToken?.sub;
        setAuthenticatedUserId(userId);

        if (decodedToken?.identity_proofing_level) {
          setIsNhsLinkedAccount(true);
        } else {
          setIsNhsLinkedAccount(false);
        }

        const email = decodedToken?.email;
        setAuthenticatedEmail(email);

        const firstname = decodedToken?.given_name;
        setAuthenticatedFirstname(firstname);

        const lastname = decodedToken?.family_name;
        setAuthenticatedLastname(lastname);

        const emailVerified = decodedToken?.email_verified;
        setAuthenticatedEmailVerified(emailVerified);

        const mobile = decodedToken?.phone_number;
        setAuthenticatedMobile(mobile);

        const mobileVerified = decodedToken?.phone_number_verified;
        setAuthenticatedMobileVerified(mobileVerified);

        return true;
      }
    }
    decodedToken = null;
    return false;
  };

  const saveToken = (userToken: string) => {
    setToken(null);
    if (saveTokenValuesToMemory(userToken)) {
      setToken(userToken);
    } else {
      setToken(undefined);
    }
  };

  const [lastUrl, setLastUrl] = useState<string | null>(localStorage.getItem("currentUrl"));
  const [prevUrl, setPrevUrl] = useState<string | null>(localStorage.getItem("previousUrl"));

  const persistLastUrl = (url: string) => {
    const prev = localStorage.getItem("currentUrl");
    localStorage.setItem("previousUrl", prev || "/");
    setPrevUrl(prev || "/");
    localStorage.setItem("currentUrl", url || "/");
    setLastUrl(url || "/");
  };

  const [lastNonLoginUrl, setLastNonLoginUrl] = useState(localStorage.getItem("lastNonLoginUrl"));
  const persistLastNonLoginUrl = (url: string) => {
    if (!url) {
      // eslint-disable-next-line no-param-reassign
      url = prevUrl || lastUrl || "";
    }
    if (
      url !== "/login" &&
      url !== "/logout" &&
      url !== "/UserLogin" &&
      url !== "/LoginRedirect" &&
      url !== "/Unauthorized" &&
      url !== "/Participants/Register/Ready" &&
      url !== "/Participants/Register" &&
      url !== "/SessionExpired"
    ) {
      localStorage.setItem("lastNonLoginUrl", url || "/");
      setLastNonLoginUrl(url || "/");
    }
  };

  const isAuthenticated = () => {
    const sessionExpiryInfo = getSessionExpiry();

    if (!sessionExpiryInfo || !sessionExpiryInfo.isLoggedIn) {
      return false;
    }

    if (sessionExpiryInfo?.expiresAt) {
      return new Date() < sessionExpiryInfo?.expiresAt;
    }

    return false;
  };

  const getSessionExpiry = () => {
    const expiryCookie = Cookies.get(".BPOR.Session.Expiry");
    return new SessionExpiryInfo(expiryCookie);
  };

  const logOutToken = async () => {
    if (isAuthenticated() && !logoutLoading) {
      try {
        await logout();
        // Clear user-related cookies
        Cookies.remove(".BPOR.Session.Expiry");

        setToken(null);
        setAuthenticatedUserId(null);
        setAuthenticatedEmail(null);
        setAuthenticatedEmailVerified(null);
        setAuthenticatedFirstname(null);
        setAuthenticatedLastname(null);
        setLastNonLoginUrl(null);
        setPrevUrl(null);
        setLastUrl(null);
        setIsNhsLinkedAccount(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isNhsLinkedAccount,
        saveToken,
        logOutToken,
        isAuthenticated,
        persistLastUrl,
        persistLastNonLoginUrl,
        setIsNhsLinkedAccount,
        token,
        lastUrl,
        prevUrl,
        lastNonLoginUrl,
        authenticatedEmail,
        authenticatedEmailVerified,
        authenticatedMobile,
        authenticatedMobileVerified,
        authenticatedUserId,
        authenticatedFirstname,
        authenticatedLastname,
        isInNHSApp,
        getSessionExpiry,
        mfaDetails,
        setMfaDetails,
        setEnteredMfaMobile,
        enteredMfaMobile,
        setAuthenticatedMobile,
        userMfaEmail,
        setUserMfaEmail,
      }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </AuthContext.Provider>
  );
};
