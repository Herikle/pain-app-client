import { SideMenu } from "@components/SideMenu";
import styled from "styled-components";
import { useAuth } from "utils/hooks/useAuth";
import { LoadingPage } from "./Loading";
import { useEffect } from "react";
import Router from "next/router";
import { RoutesPath } from "utils/routes";

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

  return (
    <Container>
      {isLogged || allowGuest ? (
        <>
          <SideMenu />
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
`;
const Container = styled.div`
  display: flex;
`;
