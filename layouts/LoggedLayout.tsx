import { SideMenu } from "@components/SideMenu";
import styled from "styled-components";
import { useAuth } from "utils/hooks/useAuth";
import { LoadingPage } from "./Loading";

export const LoggedLayout = ({ children }) => {
  const { isLogged } = useAuth({ redirect: true });

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
