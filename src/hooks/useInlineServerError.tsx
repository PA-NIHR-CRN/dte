import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import Utils from "../Helper/Utils";
import customCodeLookup from "../components/Shared/ErrorMessageContainer/customCodeLookup";

const useInlineServerError = (
  serverResponse: void | AxiosResponse<any> | undefined
) => {
  const [convertedError, setConvertedError] = useState<string | null>(null);

  useEffect(() => {
    const result = Utils.ConvertResponseToDTEResponse(serverResponse);
    if (result?.errors?.length) {
      const { customCode, detail } = result.errors[0];
      const converted = customCodeLookup(customCode || "", detail || "");
      setConvertedError(converted);
    } else {
      setConvertedError(null);
    }
  }, [serverResponse]);

  return convertedError;
};

export default useInlineServerError;
