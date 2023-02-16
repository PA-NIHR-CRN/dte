import React, { useState, createContext } from "react";
import jwtDecode from "jwt-decode";
import { JWTDeCode, AuthContextProps, Role } from "../types/AuthTypes";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = (props: { children: any }) => {
  const [authenticatedEmail, setAuthenticatedEmail] = React.useState<
    string | null
  >(null);
  const [authenticatedEmailVerified, setAuthenticatedEmailVerified] =
    React.useState<boolean | null>(null);
  const [authenticatedUserId, setAuthenticatedUserId] = React.useState<
    string | null
  >(null);
  const [authenticatedFirstname, setAuthenticatedFirstname] = React.useState<
    string | null
  >(null);
  const [authenticatedLastname, setAuthenticatedLastname] = React.useState<
    string | null
  >(null);

  const [authenticatedExpiryTime, setAuthenticatedExpiryTime] = React.useState<
    number | null
  >(null);
  const [authenticatedIsAdmin, setAuthenticatedIsAdmin] = React.useState<
    boolean | null
  >(null);

  const [authenticatedIsParticipant, setAuthenticatedIsParticipant] =
    React.useState<boolean | null>(null);

  const [authenticatedIsResearcher, setAuthenticatedIsResearcher] =
    React.useState<boolean | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [token, setToken] = useState<string | null | undefined>(null);

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
        const userId = decodedToken?.["cognito:username"];
        setAuthenticatedUserId(userId);

        const expiresAt = decodedToken?.exp * 1000;
        setAuthenticatedExpiryTime(expiresAt);

        const email = decodedToken?.email;
        setAuthenticatedEmail(email);

        const firstname = decodedToken?.given_name;
        setAuthenticatedFirstname(firstname);

        const lastname = decodedToken?.family_name;
        setAuthenticatedLastname(lastname);

        const emailVerified = decodedToken?.email_verified;
        setAuthenticatedEmailVerified(emailVerified);

        const admin = decodedToken?.["cognito:groups"]?.includes("Admin");
        setAuthenticatedIsAdmin(admin);

        const participant =
          !decodedToken?.["cognito:username"]?.includes("idg");
        setAuthenticatedIsParticipant(participant);

        const researcher =
          !decodedToken?.["cognito:groups"]?.includes("Admin") &&
          decodedToken?.["cognito:username"]?.includes("idg");
        setAuthenticatedIsResearcher(researcher);
        return true;
      }
    }
    decodedToken = null;
    setAccessToken(null);

    return false;
  };
  const saveAccessToken = (passedAccessToken: string) => {
    setAccessToken(passedAccessToken);
  };
  const saveToken = (userToken: string) => {
    setToken(null);
    if (saveTokenValuesToMemory(userToken)) {
      setToken(userToken);
    } else {
      setToken(undefined);
    }
  };

  const [lastUrl, setLastUrl] = React.useState<string | null>(
    localStorage.getItem("currentUrl")
  );
  const [prevUrl, setPrevUrl] = React.useState<string | null>(
    localStorage.getItem("previousUrl")
  );

  const persistLastUrl = (url: string) => {
    const prev = localStorage.getItem("currentUrl");
    localStorage.setItem("previousUrl", prev || "/");
    setPrevUrl(prev || "/");
    localStorage.setItem("currentUrl", url || "/");
    setLastUrl(url || "/");
  };

  const [lastNonLoginUrl, setLastNonLoginUrl] = React.useState(
    localStorage.getItem("lastNonLoginUrl")
  );
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
      url !== "/Participants/Register"
    ) {
      localStorage.setItem("lastNonLoginUrl", url || "/");
      setLastNonLoginUrl(url || "/");
    }
  };

  const isAuthenticated = () => {
    if (authenticatedExpiryTime) {
      return new Date().getTime() < authenticatedExpiryTime;
    }
    return false;
  };

  const isAuthenticatedRole = (role: Role) => {
    if (role === Role.None) {
      return true;
    }

    if (isAuthenticated()) {
      switch (role) {
        case Role.Admin:
          return authenticatedIsAdmin ?? false;
        case Role.Participant:
          return authenticatedIsParticipant ?? false;
        case Role.Researcher:
          return authenticatedIsResearcher ?? false;
        default:
          break;
      }
    }
    return false;
  };

  const logOutToken = (keepAccessToken?: boolean) => {
    setToken(null);
    setAuthenticatedExpiryTime(null);
    setAuthenticatedUserId(null);
    setAuthenticatedEmail(null);
    setAuthenticatedEmailVerified(null);
    setAuthenticatedFirstname(null);
    setAuthenticatedLastname(null);
    setLastNonLoginUrl(null);
    setPrevUrl(null);
    setLastUrl(null);
    if (!keepAccessToken) {
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        saveToken,
        saveAccessToken,
        logOutToken,
        isAuthenticated,
        isAuthenticatedRole,
        persistLastUrl,
        persistLastNonLoginUrl,
        token,
        accessToken,
        lastUrl,
        prevUrl,
        lastNonLoginUrl,
        authenticatedEmail,
        authenticatedEmailVerified,
        authenticatedExpiryTime,
        authenticatedUserId,
        authenticatedFirstname,
        authenticatedLastname,
      }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </AuthContext.Provider>
  );
};
