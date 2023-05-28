import { useGetLoggedUser } from "@queries/auth/useGetAuth";
import Router from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import { getToken } from "utils/localStorage/token";
import { RoutesPath } from "utils/routes";

type UseAuthOptions = {
  redirect?: boolean;
  redirectTo?: string;
};

export const useAuth = (options?: UseAuthOptions) => {
  const loggedUser = useGetLoggedUser();

  const user = useMemo(() => loggedUser.data, [loggedUser.data]);

  const redirect = useCallback(() => {
    Router.push(options?.redirectTo || RoutesPath.login);
  }, [options?.redirectTo]);

  useEffect(() => {
    if (!options) return;

    if (options.redirect) {
      const token = getToken();
      if (!token) {
        redirect();
        return;
      }

      if (loggedUser.isFetched && loggedUser.isError) {
        redirect();
        return;
      }
    }
  }, [loggedUser.isFetched, loggedUser.isError, user, options, redirect]);

  return {
    user: user,
    isLogged: !!user,
  };
};

export const useGuest = () => {
  const loggedUser = useGetLoggedUser();

  const user = useMemo(() => loggedUser.data, [loggedUser.data]);

  useEffect(() => {
    if (user) {
      Router.push(RoutesPath.prompt);
    }
  }, [user]);
};
