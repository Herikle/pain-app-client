import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { theme } from "@styles/theme";
import { RoutesPath } from "@utils/routes";
import { IconsPath } from "@utils/icons";
import { MenuLink } from "@components/MenuLink";
import { IMe } from "types";
import { TOP_BAR_HEIGHT_PIXELS } from "../consts";

type DesktopTopBarProps = {
  user: IMe | undefined;
};

export const DesktopTopBar = ({ user }: DesktopTopBarProps) => {
  return (
    <Container>
      <Link href={RoutesPath.home}>
        <Image
          src={IconsPath.PainTrack}
          alt="PainTrack"
          width="56"
          height="37"
        />
      </Link>
      <TopBarLinks>
        {/* <StyledLink href={`${RoutesPath.home}#how-to-use`}>
          <Text color="pure_white">How to use</Text>
        </StyledLink>
        <StyledLink href="#user-guide">
          <Text color="pure_white">User guide</Text>
        </StyledLink>
        <StyledLink href="#scientific-paper">
          <Text color="pure_white">Scientific paper</Text>
        </StyledLink>
        <StyledLink href="#contact">
          <Text color="pure_white">Contact</Text>
        </StyledLink> */}
      </TopBarLinks>
      {user ? (
        <MenuLink
          href={RoutesPath.profile}
          iconPath={IconsPath.Doctor}
          label={user?.name}
        />
      ) : (
        <Link href={RoutesPath.login}>
          <Button variant="outlined" textVariant="body1Bold">
            Log in
          </Button>
        </Link>
      )}
    </Container>
  );
};

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
`;

const TopBarLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  height: 100%;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  height: ${TOP_BAR_HEIGHT_PIXELS}px;
  width: 100%;
  background-color: ${theme.colors.primary};
  z-index: 100;
  padding-inline: 36px;
  padding-block: 24px;
  display: flex;
  justify-content: space-between;
`;
