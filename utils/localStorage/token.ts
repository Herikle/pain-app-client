const tokenKey = "_paintrack_token";

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

export const storeToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};
