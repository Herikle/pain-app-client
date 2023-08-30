import { theme } from "@styles/theme";
import styled from "styled-components";
import { IconsPath } from "utils/icons";
import { MenuLink } from "@components/MenuLink";
import { capitalize } from "utils/helpers/string";
import { RoutesPath } from "@utils/routes";
import { MenuTypeProps } from "..";
import { media } from "@styles/media-query";

export const MobileMenu = ({
  isLogged,
  user,
  selectedPatient,
  patientLinkHref,
  pathname,
  patientLinkIsNotAllowed,
  selectedEpisode,
  episodeLinkHref,
  episodeLinkIsNotAllowed,
  focusedPrompt,
  promptHref,
}: MenuTypeProps) => {
  return (
    <Container>
      {isLogged ? (
        <>
          <MenuLink
            label={capitalize(user?.role) ?? "Doctor"}
            href={RoutesPath.profile}
            description={user?.name}
            iconPath={IconsPath.Doctor}
            disabled={pathname !== RoutesPath.profile}
            fullWidth
          />
          <MenuLink
            label="Patient"
            description={selectedPatient?.name}
            href={patientLinkHref()}
            iconPath={IconsPath.Patient}
            disabled={!pathname.includes(RoutesPath.new_patient)}
            notAllowed={patientLinkIsNotAllowed}
            fullWidth
          />
        </>
      ) : (
        <MenuLink
          label="Guest User"
          iconPath={IconsPath.Doctor}
          disabled={true}
          fullWidth
        />
      )}
      <MenuLink
        label="Pain Episode"
        description={selectedEpisode?.name}
        href={episodeLinkHref()}
        iconPath={IconsPath.Episode}
        disabled={!pathname.includes(RoutesPath.episode)}
        notAllowed={episodeLinkIsNotAllowed}
        fullWidth
      />
      {user?.super && (
        <MenuLink
          label="ChatGPT AI"
          description={focusedPrompt?.title}
          href={promptHref()}
          iconPath={IconsPath.GPT}
          disabled={!pathname.includes(RoutesPath.new_prompt)}
          fullWidth
        />
      )}
    </Container>
  );
};

export const MOBILE_MENU_HEIGHT = 92;

const Container = styled.div`
  width: 100%;
  height: ${MOBILE_MENU_HEIGHT}px;
  min-height: ${MOBILE_MENU_HEIGHT}px;
  background-color: ${theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  gap: 2rem;
  ${media.up.mobileL`
    gap: 0;
  `}
  z-index: 50;
`;
