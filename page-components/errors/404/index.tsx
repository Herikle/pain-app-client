import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import Error404Svg from "public/assets/404-new.svg";
import styled, { keyframes } from "styled-components";

export const Error404 = () => {
  return (
    <Container gap={1} align="center">
      <Error404Svg />
      <Text variant="h1">Error code 404</Text>
      <Text variant="h2" fontWeight="400">
        This page is unavailable. Looks like the info you tried to access must
        have been moved or deleted.
      </Text>
    </Container>
  );
};

const BounceAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-60px); }
  100% { transform: translateY(0); }
`;

const ShakingHorizontally = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
`;

const JumpingAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Container = styled(FlexColumn)`
  svg {
    overflow: visible;
    #nave {
      animation: ${BounceAnimation} 2s ease-in-out infinite;
    }
    #et2 {
      animation: ${BounceAnimation} 2s ease-in-out infinite;
    }

    [id^="et2-"] {
      animation: ${ShakingHorizontally} 0.15s linear infinite;
    }

    #wind {
      animation: ${BounceAnimation} 2s ease-in-out infinite;
    }

    [id^="wind-"] {
      animation: ${ShakingHorizontally} 0.1s linear infinite;
    }

    #et1 {
      animation: ${JumpingAnimation} 1s ease-out infinite;
    }
  }
`;
