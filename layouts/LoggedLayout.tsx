import { SideMenu } from "@components/SideMenu";
import { styled } from "styled-components";

export const LoggedLayout = ({ children }) => {
  return (
    <Container>
      <SideMenu />
      <Content>{children}</Content>
    </Container>
  );
};

const Content = styled.div`
  padding: 5rem;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
`;
