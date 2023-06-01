import { SideMenu } from "@components/SideMenu";
import styled from "styled-components";
import { useAuth } from "utils/hooks/useAuth";
import { LoadingPage } from "./Loading";
import { useEffect } from "react";
import Router from "next/router";
import { RoutesPath } from "utils/routes";

type Props = {
  children: React.ReactNode;
  onlySuper?: boolean;
};

export const LoggedLayout = ({ children, onlySuper }: Props) => {
  const { isLogged, user } = useAuth({ redirect: true });

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
      {isLogged ? (
        <>
          <SideMenu />
          <Content>{children}</Content>
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
`;
const Container = styled.div`
  display: flex;
`;
