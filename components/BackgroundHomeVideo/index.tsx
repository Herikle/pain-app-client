import styled, { css } from "styled-components";
import Router from "next/router";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { theme } from "@styles/theme";

import { useCreateEpisode } from "@queries/episode/useEpisode";
import { RoutesPath } from "@utils/routes";
import { media, useMatchMediaUp } from "@styles/media-query";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { useAuth } from "@utils/hooks/useAuth";
import Link from "next/link";
import { useEffect, useRef } from "react";

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

  const { isLogged } = useAuth();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <Container>
      <Video
        ref={videoRef}
        src="/video/video-background.mp4"
        autoPlay
        muted
        loop
      />
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
        {isLogged ? (
          <Link href={RoutesPath.profile}>
            <Button color="cta" width={isMobileL ? "100%" : "400px"}>
              Go to profile
            </Button>
          </Link>
        ) : (
          <Button
            color="cta"
            width={isMobileL ? "100%" : "400px"}
            onClick={onCreateEpisode}
            loading={createEpisode.isLoading}
          >
            Register a pain episode
          </Button>
        )}
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
