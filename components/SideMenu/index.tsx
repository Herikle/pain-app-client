import { theme } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { RoutesPath } from "utils/routes";
import { IconsPath } from "utils/icons";
import { MenuLink } from "@components/MenuLink";
import { useAuth } from "utils/hooks/useAuth";
import { SignOut } from "@phosphor-icons/react";
import { capitalize } from "utils/helpers/string";
import { useRouter } from "next/router";
import { useSelectedPatientValue } from "state/useSelectedPatient";

export const SideMenu = () => {
  const { user, logOut } = useAuth();

  const { pathname } = useRouter();

  const selectedPatient = useSelectedPatientValue();

  const patientLinkIsNotAllowed =
    pathname !== RoutesPath.new_patient && !selectedPatient;

  const patientLinkHref = () => {
    if (selectedPatient) {
      return RoutesPath.patient.replace(":id", selectedPatient._id);
    }

    return RoutesPath.new_patient;
  };

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
        {user?.super && (
          <MenuLink
            label="ChatGPT AI"
            href={RoutesPath.prompt}
            iconPath={IconsPath.GPT}
            disabled={pathname !== RoutesPath.prompt}
            fullWidth
          />
        )}
      </TopItens>
      <BottomItens>
        <LogOutContainer>
          <MenuLink
            PhosphorIcon={SignOut}
            label="Exit session"
            description={user?.name}
            onClick={logOut}
          />
        </LogOutContainer>
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
