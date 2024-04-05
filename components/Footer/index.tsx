import { theme } from "@styles/theme";
import styled from "styled-components";
import { Text } from "@components/Text";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { media } from "@styles/media-query";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const Footer = () => {
  return (
    <Container>
      <Text
        variant="h2"
        fontWeight="400"
        color="pure_white"
        fontFamily={montserrat}
      >
        PAIN<strong>TRACK</strong>
      </Text>
      <FooterLinks>
        <Link href="contact">
          <Text color="pure_white" opacity={0.4}>
            Contact
          </Text>
        </Link>
        <Link href="about">
          <Text color="pure_white" opacity={0.4}>
            About PainTrack.org
          </Text>
        </Link>
      </FooterLinks>
    </Container>
  );
};

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;

  ${media.up.mobileL`
    gap: 0.5rem;
    flex-direction: column;
  `}
`;

const Container = styled.div`
  width: 100%;
  height: ${TOP_BAR_HEIGHT_PIXELS}px;
  background-color: ${theme.colors.primary};
  padding-inline: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.up.mobileM`
    overflow:hidden;
  `}
`;
