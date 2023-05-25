"use client";

import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { theme } from "@styles/theme";

export const TopBar = () => {
  return (
    <Container>
      <Image
        src="/icons/pain-track.svg"
        alt="PainTrack"
        width="56"
        height="37"
      />
      <TopBarLinks>
        <Link href="#how-to-use">
          <Text color="pure_white">How to use</Text>
        </Link>
        <Link href="#user-guide">
          <Text color="pure_white">User guide</Text>
        </Link>
        <Link href="#scientific-paper">
          <Text color="pure_white">Scientific paper</Text>
        </Link>
        <Link href="#contact">
          <Text color="pure_white">Contact</Text>
        </Link>
      </TopBarLinks>
      <Link href="/login">
        <Button variant="outlined">Log in/Sign up</Button>
      </Link>
    </Container>
  );
};

const TopBarLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 84px;
  width: 100%;
  background-color: ${theme.colors.primary};
  z-index: 100;
  padding-inline: 36px;
  padding-block: 24px;
  display: flex;
  justify-content: space-between;
`;
