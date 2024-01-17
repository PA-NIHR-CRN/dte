// axiosSetup.ts
import axios, { AxiosError } from "axios";

export const setupAxiosInterceptors = (
  onMaintenanceModeDetected: (inMaintenance: boolean) => void
): void => {
  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 503) {
        onMaintenanceModeDetected(true);
      }
      return Promise.reject(error);
    }
  );
};
