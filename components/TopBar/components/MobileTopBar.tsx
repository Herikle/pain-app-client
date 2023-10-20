import Image from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { theme } from "@styles/theme";
import { RoutesPath } from "utils/routes";
import { IconsPath } from "utils/icons";
import { MenuLink } from "@components/MenuLink";
import { IMe } from "types";
import { TOP_BAR_HEIGHT_PIXELS } from "../consts";
import {
  ChatsCircle,
  List,
  Notebook,
  Question,
  UserCircle,
  UserList,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

type SideBarProps = {
  user: IMe | undefined;
  open: boolean;
  onClose: () => void;
};

const SideBar = ({ user, open, onClose }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
    } else {
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  }, [open]);

  if (!isOpen) return null;

  return (
    <>
      <SideBarContainer $open={open}>
        <LoginButtonContainer>
          {user ? (
            <StyledLink href={RoutesPath.profile}>
              <UserCircle size={26} color={theme.colors.pure_white} />
              <Text color="pure_white">{user?.name}</Text>
            </StyledLink>
          ) : (
            <StyledLink href={RoutesPath.login}>
              <UserCircle size={26} color={theme.colors.pure_white} />
              <Text color="pure_white">Log in or Register</Text>
            </StyledLink>
          )}
        </LoginButtonContainer>
        <Links>
          <StyledLink href={`${RoutesPath.home}#how-to-use`}>
            <Question size={26} color={theme.colors.pure_white} />
            <Text color="pure_white">How to use</Text>
          </StyledLink>
          <StyledLink href="#user-guide">
            <UserList size={26} color={theme.colors.pure_white} />
            <Text color="pure_white">User guide</Text>
          </StyledLink>
          <StyledLink href="#scientific-paper">
            <Notebook size={26} color={theme.colors.pure_white} />
            <Text color="pure_white">Scientific paper</Text>
          </StyledLink>
          <StyledLink href="#contact">
            <ChatsCircle size={32} color={theme.colors.pure_white} />
            <Text color="pure_white">Contact</Text>
          </StyledLink>
        </Links>
      </SideBarContainer>
      <Overlay onClick={onClose} />
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 99;
`;

const LoginButtonContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.secondary_color};
  width: 100%;
  padding-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-inline: 1rem;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.5rem;
  margin-top: 3rem;
`;

type SideBarContainerProps = {
  $open: boolean;
};

const SlideInAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }

`;

const SideBarContainer = styled.div<SideBarContainerProps>`
  position: fixed;
  top: ${TOP_BAR_HEIGHT_PIXELS}px;
  width: fit-content;
  height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS}px);
  background-color: ${theme.colors.primary};
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-inline: 2rem;
  padding-top: 3rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
  animation: ${SlideInAnimation} 0.3s ease-in-out;
`;

type DesktopTopBarProps = {
  user: IMe | undefined;
};

export const MobileTopBar = ({ user }: DesktopTopBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Container>
        <List
          size={32}
          color={theme.colors.pure_white}
          height="100%"
          onClick={toggle}
        />
        <HomeLinkContainer>
          <Link href={RoutesPath.home}>
            <Image
              src={IconsPath.PainTrack}
              alt="PainTrack"
              width="56"
              height="37"
            />
          </Link>
        </HomeLinkContainer>
      </Container>
      <SideBar user={user} open={isOpen} onClose={toggle} />
    </>
  );
};

const HomeLinkContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
