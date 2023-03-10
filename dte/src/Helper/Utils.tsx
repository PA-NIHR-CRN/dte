// import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
import { AxiosResponse } from "axios";
import { DTEAxiosResponse } from "../types/AuthTypes";

export default class Utils {
  static IsCPMSStatusDTEReady(statusName: string) {
    if (statusName) {
      const supportedStatuses =
        process.env.REACT_APP_DTE_READY_STATUS_LIST?.split("#");
      const language = supportedStatuses?.find(
        (status: any) => status === statusName
      );
      return !!language;
    }
    return false;
  }

  static ConvertDate = (date: string) => {
    if (date !== undefined) {
      return new Date(parseInt(date, 10)).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "";
  };

  static ConvertDateWithTime = (date: string) => {
    if (date !== undefined) {
      return new Date(parseInt(date, 10)).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }
    return "";
  };

  static ConvertDateForPicker = (date: string) => {
    if (date !== undefined) {
      return new Date(parseInt(date, 10)).toLocaleDateString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    }
    return "";
  };

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
}
export const EmailRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
