import { RoutesPath } from "utils/routes";
import { useAuth } from "utils/hooks/useAuth";
import { useRouter } from "next/router";
import { useSelectedPatientValue } from "state/useSelectedPatient";
import { useSelectedEpisodeValue } from "state/useSelectedEpisode";
import { useGetLastPrompt } from "@queries/prompt/useGetPrompt";
import { useMemo } from "react";
import { useSelectedPromptValue } from "state/useSelectedPrompt";
import { useMatchMediaUp } from "@styles/media-query";
import { DesktopMenu } from "./components/DesktopMenu";
import { IEpisode, IMe, IPatient, IPrompt } from "types";
import { MobileMenu } from "./components/MobileMenu";

export const SideMenu = () => {
  const { user, logOut, isLogged } = useAuth();

  const { pathname } = useRouter();

  const getLastPrompt = useGetLastPrompt({
    enabled: isLogged,
  });

  const lastPrompt = useMemo(() => getLastPrompt.data, [getLastPrompt.data]);

  const selectedPatient = useSelectedPatientValue();

  const selectedEpisode = useSelectedEpisodeValue();

  const selectedPrompt = useSelectedPromptValue();

  const patientLinkIsNotAllowed =
    pathname !== RoutesPath.new_patient && !selectedPatient;

  const focusedPrompt = useMemo(() => {
    if (pathname === RoutesPath.new_prompt) {
      return null;
    }

    return selectedPrompt ?? lastPrompt;
  }, [selectedPrompt, lastPrompt, pathname]);

  const patientLinkHref = () => {
    if (selectedPatient) {
      return RoutesPath.patient.replace("[id]", selectedPatient._id);
    }

    return RoutesPath.new_patient;
  };

  const episodeLinkIsNotAllowed = !selectedEpisode;

  const episodeLinkHref = () => {
    if (selectedEpisode) {
      return RoutesPath.episode.replace("[id]", selectedEpisode._id);
    }

    return "#";
  };

  const promptHref = () => {
    if (focusedPrompt) {
      return RoutesPath.prompt.replace("[id]", focusedPrompt._id);
    }
    return RoutesPath.new_prompt;
  };

  const isTabletUp = useMatchMediaUp("tablet");

  return isTabletUp ? (
    <MobileMenu
      isLogged={isLogged}
      user={user}
      selectedPatient={selectedPatient}
      patientLinkHref={patientLinkHref}
      pathname={pathname}
      patientLinkIsNotAllowed={patientLinkIsNotAllowed}
      selectedEpisode={selectedEpisode}
      episodeLinkHref={episodeLinkHref}
      episodeLinkIsNotAllowed={episodeLinkIsNotAllowed}
      focusedPrompt={focusedPrompt}
      promptHref={promptHref}
      logOut={logOut}
    />
  ) : (
    <DesktopMenu
      isLogged={isLogged}
      user={user}
      selectedPatient={selectedPatient}
      patientLinkHref={patientLinkHref}
      pathname={pathname}
      patientLinkIsNotAllowed={patientLinkIsNotAllowed}
      selectedEpisode={selectedEpisode}
      episodeLinkHref={episodeLinkHref}
      episodeLinkIsNotAllowed={episodeLinkIsNotAllowed}
      focusedPrompt={focusedPrompt}
      promptHref={promptHref}
      logOut={logOut}
    />
  );
};

export type MenuTypeProps = {
  isLogged: boolean;
  user: IMe | undefined;
  selectedPatient: IPatient | null;
  patientLinkHref: () => string;
  pathname: string;
  patientLinkIsNotAllowed: boolean;
  selectedEpisode: IEpisode | null;
  episodeLinkHref: () => string;
  episodeLinkIsNotAllowed: boolean;
  focusedPrompt: IPrompt | null | undefined;
  promptHref: () => string;
  logOut: () => void;
};
