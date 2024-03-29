const tokenKey = "_paintrack_token";

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

export const hasToken = () => {
  return !!getToken();
};

export const storeToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const clearToken = () => {
  localStorage.removeItem(tokenKey);
};
