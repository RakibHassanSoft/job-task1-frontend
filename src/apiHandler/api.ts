import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";

// Base URL for your API
// const BASE_URL = "http://localhost:3000/api/v1";
const BASE_URL = "https://job-task1-backend.onrender.com/api/v1";

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
      // console.error("Unauthorized: please login again");
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Please login again",
        confirmButtonText: "OK",
      });
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
