import { Footer } from "@components/Footer";
import { TOP_BAR_HEIGHT, TopBar } from "@components/TopBar";
import { styled } from "styled-components";

export const GuestLayout = ({ children }) => {
  return (
    <>
      <TopBar />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

const Content = styled.div`
  margin-top: ${TOP_BAR_HEIGHT};
`;
