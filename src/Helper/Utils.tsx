// import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
import { AxiosResponse } from "axios";
import { DTEAxiosResponse } from "../types/AuthTypes";
import { ReactNode } from "react";
import DTEContent from "../components/Shared/UI/DTETypography/DTEContent/DTEContent";

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

export const capitaliseWords = (input: string) =>
  input
    .toLowerCase()
    .split(" ")
    .map((word) =>
      /\d/.test(word)
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

export const formatDisplayAddress = (address: any) => {
  let formattedCheckAddress: ReactNode = <></>;

  const lineManagement = (builder: ReactNode, newElement: string) => {
    const intialBuilder: ReactNode = `<>{newElement}</>`;
    const newLineBuilder: ReactNode = (
      <>
        {builder} <br /> {newElement}
      </>
    );
    return builder !== <></> ? newLineBuilder : intialBuilder;
  };

  if (address.address.addressLine1) {
    formattedCheckAddress = capitaliseWords(address.address.addressLine1);
  }
  if (address.address.addressLine2) {
    formattedCheckAddress = lineManagement(
      formattedCheckAddress,
      capitaliseWords(address.address.addressLine2)
    );
  }
  if (address.address.addressLine3) {
    formattedCheckAddress = lineManagement(
      formattedCheckAddress,
      capitaliseWords(address.address.addressLine3)
    );
  }
  if (address.address.addressLine4) {
    formattedCheckAddress = lineManagement(
      formattedCheckAddress,
      capitaliseWords(address.address.addressLine4)
    );
  }
  if (address.address.town) {
    formattedCheckAddress = lineManagement(
      formattedCheckAddress,
      capitaliseWords(address.address.town)
    );
  }
  if (address.postcode) {
    formattedCheckAddress = lineManagement(
      formattedCheckAddress,
      address.postcode
    );
  }

  return (<DTEContent>{formattedCheckAddress}</DTEContent>) as ReactNode;
};
