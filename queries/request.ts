import axios, { Method, ResponseType } from "axios";
import { getToken } from "utils/localStorage/token";

type service = "auth" | "prompt" | "account" | "patient" | "episode" | "public";

type IRequest = {
  method: Method;
  service: service;
  url?: string;
  data?: { [key: string]: any };
  query?: { [key: string]: any };
  responseType?: ResponseType;
};

axios.interceptors.request.use((config) => {
  try {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {}
  return config;
});

export const request = ({
  url = "",
  method,
  data,
  query,
  service,
  responseType,
}: IRequest) =>
  axios.request({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/" + service,
    headers: {
      "Content-Type": "application/json",
    },
    url,
    method,
    data,
    params: query,
    responseType,
  });
