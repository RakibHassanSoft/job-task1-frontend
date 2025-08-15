import axios from "axios";
import type { AxiosRequestConfig } from "axios";

// Base URL for your API
const BASE_URL = "http://localhost:3000/api/v1";

// --- Public Axios instance ---
export const publicAxios = axios.create({
  baseURL: BASE_URL,
   withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Private Axios instance (sends cookies automatically) ---
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Optional: Add interceptors for privateAxios ---
privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: please login again");
      // Optional: redirect to login
    }
    return Promise.reject(error);
  }
);

// --- Generic functions ---

export async function fetchPublic<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const { data } = await publicAxios.request<T>({
    url: endpoint,
    ...config,
  });
  return data;
}

export async function fetchPrivate<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const { data } = await privateAxios.request<T>({
    url: endpoint,
    ...config,
  });
  return data;
}
