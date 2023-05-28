import axios, { Method, ResponseType } from "axios";

type service = "auth";

type IRequest = {
  method: Method;
  service: service;
  url?: string;
  data?: { [key: string]: any };
  query?: { [key: string]: any };
  responseType?: ResponseType;
};

export const setToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

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
