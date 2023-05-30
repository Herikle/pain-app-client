import { theme } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { RoutesPath } from "utils/routes";
import { IconsPath } from "utils/icons";
import { MenuLink } from "@components/MenuLink";
import { useAuth } from "utils/hooks/useAuth";
import { SignOut } from "@phosphor-icons/react";

export const SideMenu = () => {
  const { user, logOut } = useAuth();

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
          label="Doctor"
          href={RoutesPath.prompt}
          description={user?.name}
          iconPath={IconsPath.Doctor}
          fullWidth
        />
        <MenuLink
          label="ChatGPT AI"
          href={RoutesPath.prompt}
          iconPath={IconsPath.GPT}
          fullWidth
        />
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
