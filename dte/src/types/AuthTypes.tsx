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
  token_use: string;
  "cognito:groups": string[];
}

export enum Role {
  Participant,
  Admin,
  Researcher,
  None,
}
export interface AuthContextProps {
  saveAccessToken: (accessToken: string) => void;
  saveToken: (token: string) => void;
  logOutToken: (keepAccessToken?: boolean) => void;
  isAuthenticated: () => boolean;
  isAuthenticatedRole: (role: Role) => boolean;
  persistLastUrl: (url: string) => void;
  persistLastNonLoginUrl: (url: string) => void;
  token: string | null | undefined;
  accessToken: string | null;
  lastUrl: string | null;
  prevUrl: string | null;
  lastNonLoginUrl: string | null;
  authenticatedEmail: string | null;
  authenticatedEmailVerified: boolean | null;
  authenticatedExpiryTime: number | null;
  authenticatedUserId: string | null;
  authenticatedFirstname: string | null;
  authenticatedLastname: string | null;
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
