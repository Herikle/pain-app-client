import { LoadingPage } from "@layouts/Loading";
import Router from "next/router";
import { useGoogleOAuth } from "@queries/auth/useAuth";
import {
  clearGuestEpisode,
  getGuestEpisodeId,
} from "@utils/localStorage/guestEpisode";
import { useEffect } from "react";
import { RoutesPath } from "@utils/routes";

export default function GoogleOAuth() {
  const oauthLogin = useGoogleOAuth();

  useEffect(() => {
    const makeOauthLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const oauthBody: {
          code: string;
          episode_id?: string;
        } = {
          code: code,
        };
        const guestEpisodeId = getGuestEpisodeId();
        if (guestEpisodeId) {
          oauthBody.episode_id = guestEpisodeId;
        }
        await oauthLogin.mutateAsync({
          body: oauthBody,
        });
        if (guestEpisodeId) clearGuestEpisode();
        Router.push(RoutesPath.profile);
      }
    };

    makeOauthLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingPage />;
}
