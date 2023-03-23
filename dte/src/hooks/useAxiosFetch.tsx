import { useState, useEffect } from "react";
import {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosPromise,
} from "axios";
import useAxios, { Options } from "axios-hooks";

export interface AxiosFetchResponseValues {
  data?: any;
  loading?: boolean;
  error?: AxiosError<any>;
  response?: AxiosResponse<any>;
}
export type UseAxiosFetchResult = [
  AxiosFetchResponseValues,
  (
    refetchConfig?: AxiosRequestConfig | undefined,
    refetchOptions?: Options | undefined
  ) => AxiosPromise<any>,
  () => void
];

const useAxiosFetch = (
  config: AxiosRequestConfig,
  options?: Options | undefined
): UseAxiosFetchResult => {
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<AxiosError<any> | undefined>(undefined);
  const [loading, setLoading] = useState<undefined | boolean>(false);
  const [response, setResponse] = useState<AxiosResponse<any> | undefined>(
    undefined
  );

  let configSpread: AxiosRequestConfig = config;

  configSpread = {
    ...config,
    withCredentials: true,
  };

  const [
    {
      data: axiosData,
      error: axiosError,
      loading: axiosLoading,
      response: axiosResponse,
    },
    refetch,
  ] = useAxios(configSpread, options);

  // When axiosData changes update data
  useEffect(() => {
    setData(axiosData);
  }, [axiosData]);

  // When axiosData changes update data
  useEffect(() => {
    setError(axiosError);
  }, [axiosError]);

  // When axiosData changes update data
  useEffect(() => {
    setResponse(axiosResponse);
  }, [axiosResponse]);

  // When axiosData changes update data
  useEffect(() => {
    setLoading(axiosLoading);
  }, [axiosLoading]);

  const clear = () => {
    setData(undefined);
    setError(undefined);
    setLoading(false);
    setResponse(undefined);
  };

  const clearAndRefetch = (
    refetchConfig?: AxiosRequestConfig | undefined,
    refetchOptions?: Options | undefined
  ) => {
    clear();
    return refetch(refetchConfig, refetchOptions).catch();
  };

  const resp = { data, error, loading, response };

  return [resp, clearAndRefetch, clear];
};

export default useAxiosFetch;
