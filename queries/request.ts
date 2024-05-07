import axios, { Method, ResponseType } from "axios";
import { getToken } from "@utils/localStorage/token";

export type RequestService =
  | "auth"
  | "prompt"
  | "account"
  | "patient"
  | "episode"
  | "episode-guest"
  | "public"
  | "track"
  | "track-guest"
  | "segment"
  | "segment-guest"
  | "segment-justification"
  | "segment-justification-guest"
  | "sugestion"
  | "bookmark-patients";

type IRequest = {
  method: Method;
  service: RequestService;
  url?: string;
  data?: { [key: string]: any };
  query?: { [key: string]: any };
  responseType?: ResponseType;
  headers?: { [key: string]: any };
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
  headers = {},
}: IRequest) =>
  axios.request({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/" + service,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    url,
    method,
    data,
    params: query,
    responseType,
  });
