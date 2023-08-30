import styled, { css } from "styled-components";
import Router from "next/router";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { theme } from "@styles/theme";

import { useCreateEpisode } from "@queries/episode/useEpisode";
import { RoutesPath } from "@utils/routes";
import { media, useMatchMediaUp } from "@styles/media-query";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";

export const BackgroundVideo = () => {
  const createEpisode = useCreateEpisode();

  const onCreateEpisode = async () => {
    const created = await createEpisode.mutateAsync({
      body: {
        patient_id: null,
      },
    });

    Router.push(RoutesPath.episode.replace("[id]", created._id));
  };

  const isMobileL = useMatchMediaUp("mobileL");

  return (
    <Container>
      <Video src="/video/video-background.mp4" autoPlay muted loop />
      <Overlay />
      <Apresentation>
        <Text
          variant="h1"
          fontSize={isMobileL ? "40px" : "80px"}
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
        <Button
          color="cta"
          width={isMobileL ? "100%" : "400px"}
          onClick={onCreateEpisode}
          loading={createEpisode.isLoading}
        >
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
  ${media.up.mobileL`
    padding-inline:1rem;
    top: 40%;
    width: 100%;
    gap: 2rem;
  `}
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.primary};
  opacity: 0.5;
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: auto;
  ${media.up.laptop`
    height: 100%;
    width: auto;
  `}
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS}px);
  max-height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS}px);
  overflow: hidden;
  position: relative;
`;
