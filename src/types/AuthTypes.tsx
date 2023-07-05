/* eslint-disable camelcase */

import { ReactNode } from "react";

export interface JWTDeCode {
  "cognito:username": string;
  email: string;
  given_name: string;
  family_name: string;
  iat: number;
  aud: number;
  exp: number;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  token_use: string;
  "cognito:groups": string[];
  sub: string;
  identity_proofing_level: string;
}

export enum Role {
  Participant,
  Admin,
  Researcher,
  None,
}
export interface AuthContextProps {
  isInNHSApp: boolean;
  saveToken: (token: string) => void;
  logOutToken: () => void;
  isAuthenticated: () => boolean;
  isAuthenticatedRole: (role: Role) => boolean;
  persistLastUrl: (url: string) => void;
  persistLastNonLoginUrl: (url: string) => void;
  token: string | null | undefined;
  lastUrl: string | null;
  prevUrl: string | null;
  lastNonLoginUrl: string | null;
  authenticatedEmail: string | null;
  authenticatedEmailVerified: boolean | null;
  authenticatedMobile: string | null;
  authenticatedMobileVerified: boolean | null;
  authenticatedUserId: string | null;
  authenticatedFirstname: string | null;
  authenticatedLastname: string | null;
  isNhsLinkedAccount: boolean;
  setIsNhsLinkedAccount: (isNhsLinkedAccount: boolean) => void;
  getSessionExpiry: () => SessionExpiryInfo;
  mfaDetails: string;
  setMfaDetails: (mfaDetails: string) => void;
  setEnteredMfaMobile: (enteredMfaMobile: string) => void;
  enteredMfaMobile: string;
  setAuthenticatedMobile: (authenticatedMobile: string) => void;
}

export interface DTEAxiosResponse {
  isSuccess: boolean;
  errors: DTEAxiosError[];
  content: any | undefined | null;
}

export interface DTEAxiosError {
  code?: string;
  detail?: string | ReactNode;
  customCode?: string;
  service?: string;
  component?: string;
  exceptionName?: string;
  httpStatusName?: string;
  httpStatusCode?: number;
  httpResponseString?: any;
  meta?: {
    severity: string;
    service: string;
    innerErrors: DTEAxiosError[];
  };
}

export interface NHSApp {
  tools: {
    isOpenInNHSApp: () => boolean;
  };
  navigation: {
    goToHomepage: () => void;
    goToPage: (page: number) => void;
    openBrowserOverlay: (url: string) => void;
    HOME_PAGE: number;
  };
}

export class SessionExpiryInfo {
  constructor(cookieValue: string | undefined) {
    if (cookieValue === undefined || !cookieValue) {
      return;
    }

    const cookie = JSON.parse(cookieValue);
    this.issuedAt = new Date(cookie.issuedAt);
    this.expiresAt = new Date(cookie.expiresAt);

    const now = new Date();

    if (this.expiresAt && this.issuedAt) {
      this.isLoggedIn = true;

      this.duration = Math.ceil(
        (this.expiresAt.getTime() - this.issuedAt.getTime()) / 1000
      );

      this.remaining = Math.ceil(
        Math.abs(now.getTime() - (this.expiresAt.getTime() ?? now.getTime())) /
          1000
      );

      this.used = Math.ceil(
        Math.abs(now.getTime() - (this.issuedAt.getTime() ?? now.getTime())) /
          1000
      );
    }
  }

  issuedAt: Date | undefined;

  expiresAt: Date | undefined;

  remaining = 0;

  used = 0;

  duration = 0;

  isLoggedIn = false;
}
