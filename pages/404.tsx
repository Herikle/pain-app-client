import { Error404 } from "@page-components/errors/404";
import styled from "styled-components";

export default function Custom404() {
  return (
    <Container>
      <Error404 />
    </Container>
  );
}

const Container = styled.div`
  width: fit-content;
  margin: auto;
  height: 100vh;
  display: flex;
  align-items: center;
`;
