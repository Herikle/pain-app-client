import { theme } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { RoutesPath } from "utils/routes";
import { IconsPath } from "utils/icons";
import { MenuLink } from "@components/MenuLink";

export const SideMenu = () => {
  return (
    <Container>
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
        description="John Doe"
        iconPath={IconsPath.Doctor}
        fullWidth
      />
      <MenuLink label="ChatGPT AI" iconPath={IconsPath.GPT} fullWidth />
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  height: 100vh;
  background-color: ${theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding-top: 3rem;
`;
