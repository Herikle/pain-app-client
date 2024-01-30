import { theme } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { IconsPath } from "utils/icons";
import { MenuLink } from "@components/MenuLink";
import { SignOut } from "@phosphor-icons/react";
import { capitalize } from "utils/helpers/string";
import { RoutesPath } from "@utils/routes";
import { MenuTypeProps } from "..";

export const DesktopMenu = ({
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
  logOut,
}: MenuTypeProps) => {
  return (
    <Container>
      <TopItens>
        <Link href={RoutesPath.home}>
          <Image
            src={IconsPath.PainTrack}
            alt="Pain Track Icon"
            width="85"
            height="55"
          />
        </Link>
        {isLogged ? (
          <>
            <MenuLink
              label="User"
              href={RoutesPath.profile}
              description={user?.name}
              iconPath={IconsPath.Doctor}
              disabled={pathname !== RoutesPath.profile}
              fullWidth
            />
            <MenuLink
              label="Subject"
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
      </TopItens>
      <BottomItens>
        {isLogged && (
          <LogOutContainer>
            <MenuLink
              PhosphorIcon={SignOut}
              label="Exit session"
              description={user?.name}
              onClick={logOut}
              cursor="pointer"
            />
          </LogOutContainer>
        )}
      </BottomItens>
    </Container>
  );
};

const LogOutContainer = styled.div``;

const BottomItens = styled.div`
  padding-bottom: 3rem;
`;

const TopItens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Container = styled.div`
  width: 250px;
  height: 100vh;
  background-color: ${theme.colors.primary};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
`;
