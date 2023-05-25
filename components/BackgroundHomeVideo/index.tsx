import { styled } from "styled-components";
import { Raleway } from "next/font/google";
import { transparentize } from "polished";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { theme } from "@styles/theme";
import { TOP_BAR_HEIGHT } from "@components/TopBar";

const raleway = Raleway({ subsets: ["latin"] });

export const BackgroundVideo = () => {
  return (
    <Container className={raleway.className}>
      <Video src="/video/video-background.mp4" autoPlay muted loop />
      <Overlay />
      <Apresentation>
        <Text
          variant="h1"
          fontSize="80px"
          fontWeight="400"
          color={"pure_white"}
        >
          Pain<b>Track</b>
        </Text>
        <Text color={"pure_white"} align="center" variant="body1Bold">
          A scientific tool for the description and analysis of
          <br />
          the pain experience
        </Text>
        <Button color="cta" width="400px">
          Register a pain episode
        </Button>
      </Apresentation>
    </Container>
  );
};

const Apresentation = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${transparentize(0.5, theme.colors.primary)};
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: auto;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - ${TOP_BAR_HEIGHT});
  max-height: calc(100vh - ${TOP_BAR_HEIGHT});
  overflow: hidden;
  position: relative;
`;
