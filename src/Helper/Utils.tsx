import { AxiosResponse } from "axios";
import { DTEAxiosResponse } from "../types/AuthTypes";

export default class Utils {
  static ConvertResponseToDTEResponse = (
    resp?: AxiosResponse<any> | void
  ): DTEAxiosResponse | undefined => {
    if (!resp) {
      return undefined;
    }
    if (resp.status >= 200 && resp.status <= 299) {
      return resp.data as DTEAxiosResponse;
    }
    return undefined;
  };

  static TrimFormDataFields = (formData: Record<string, string | boolean>) => {
    const updatedFormData = { ...formData };
    Object.keys(updatedFormData).forEach((key) => {
      if (typeof updatedFormData[key] === "string") {
        updatedFormData[key] = (updatedFormData[key] as string).trim();
      }
    });
    return updatedFormData;
  };

  static FocusOnError = () => {
    const inputWithError = document.getElementsByClassName(
      "nhsuk-error-message"
    )[0];
    if (inputWithError && inputWithError.id) {
      const regex = /--error-message/g;
      const errorId = inputWithError.id.replace(regex, "");
      const errorElement = document.getElementById(errorId);
      if (
        errorElement?.tagName === "INPUT" ||
        errorElement?.tagName === "SELECT"
      ) {
        errorElement.focus();
      } else {
        errorElement?.getElementsByTagName("input")[0].focus();
      }
    }
  };
}
export const EmailRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const MobileRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^((\+44\s?7|07)\d{3}\s?\d{3}\s?\d{3})$/
);

export const LandlineRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(?:\+44\s?|0)[1238]\d\s?(?:\d\s?){7,8}$/
);
