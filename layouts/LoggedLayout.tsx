import { SideMenu } from "@components/SideMenu";
import styled from "styled-components";
import { useAuth } from "utils/hooks/useAuth";
import { LoadingPage } from "./Loading";
import { useEffect } from "react";
import Router from "next/router";
import { RoutesPath } from "utils/routes";
import { media, useMatchMediaUp } from "@styles/media-query";
import { MOBILE_MENU_HEIGHT } from "@components/SideMenu/components/MobileMenu";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { TopBar } from "@components/TopBar";

type Props = {
  children: React.ReactNode;
  allowGuest?: boolean;
  onlySuper?: boolean;
};

export const LoggedLayout = ({ children, allowGuest, onlySuper }: Props) => {
  const { isLogged, user } = useAuth({ redirect: !allowGuest });

  useEffect(() => {
    if (user) {
      if (onlySuper) {
        if (!user.super) {
          Router.replace(RoutesPath.home);
        }
      }
    }
  }, [user, onlySuper]);

  const isTabletUp = useMatchMediaUp("tablet");

  return (
    <Container>
      {isLogged || allowGuest ? (
        <>
          <SideMenu />
          {isTabletUp && <TopBar />}
          <Content id="main-content">{children}</Content>
        </>
      ) : (
        <LoadingPage />
      )}
    </Container>
  );
};

const Content = styled.div`
  padding: 5rem;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  ${media.up.tablet`
    padding-inline: 1rem;   
    padding-block: 2rem;
    height: 100%;
    margin-top: ${TOP_BAR_HEIGHT_PIXELS}px;
    margin-bottom: ${MOBILE_MENU_HEIGHT}px;
  `}
`;
const Container = styled.div`
  display: flex;
`;
