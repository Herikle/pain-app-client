import { Footer } from "@components/Footer";
import { TopBar } from "@components/TopBar";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { media } from "@styles/media-query";
import styled from "styled-components";

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
  margin-top: ${TOP_BAR_HEIGHT_PIXELS}px;
`;
