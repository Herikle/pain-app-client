import { theme } from "@styles/theme";
import styled from "styled-components";
import { Inter } from "next/font/google";
import { Text } from "@components/Text";
import Link from "next/link";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";

const inter = Inter({ subsets: ["latin"] });

export const Footer = () => {
  return (
    <Container className={inter.className}>
      <Text variant="h2" fontWeight="400" color="pure_white">
        Pain<strong>Track</strong>
      </Text>
      <FooterLinks>
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
`;

const Container = styled.div`
  width: 100%;
  height: ${TOP_BAR_HEIGHT_PIXELS}px;
  background-color: ${theme.colors.primary};
  padding-inline: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
