import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import Utils from "../Helper/Utils";
import customCodeLookup from "../components/Shared/ErrorMessageContainer/customCodeLookup";

const useInlineServerError = (
  serverResponse: void | AxiosResponse<any> | undefined,
) => {
  const [convertedError, setConvertedError] = useState<string | null>(null);

  useEffect(() => {
    const result = Utils.ConvertResponseToDTEResponse(serverResponse);
    if (result?.errors?.length) {
      const { customCode, detail } = result.errors[0];

      // Ignore certain errors
      const ignoreErrors = [
        "Sms_Mfa_Challenge",
        "Software_Token_Mfa_Challenge",
        "Setup_Mfa_Challenge",
      ];

      if (customCode && !ignoreErrors.includes(customCode)) {
        const converted = customCodeLookup(customCode || "", detail || "");
        setConvertedError(converted);
      }
    } else {
      setConvertedError(null);
    }
  }, [serverResponse]);

  return convertedError;
};

export default useInlineServerError;
