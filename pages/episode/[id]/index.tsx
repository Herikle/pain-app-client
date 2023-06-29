import { BackButton } from "@components/BackButton";
import { Canvas } from "@components/Canvas";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { EpisodeForm } from "@page-components/EpisodeForm";
import { useGetEpisodeById } from "@queries/episode/useGetEpisode";
import { RoutesPath } from "@utils/routes";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useSetSelectedEpisode } from "state/useSelectedEpisode";
import { useSetSelectedPatient } from "state/useSelectedPatient";
import styled from "styled-components";

export default function EpisodePage() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const setSelectedPatient = useSetSelectedPatient();

  const setSelectedEpisode = useSetSelectedEpisode();

  const getEpisodeById = useGetEpisodeById({ episode_id: id }, !!id);

  const episode = useMemo(() => getEpisodeById.data, [getEpisodeById.data]);

  useEffect(() => {
    if (episode) {
      if (episode.patient) {
        setSelectedPatient(episode.patient);
      }
      setSelectedEpisode(episode);
    }
  }, [episode, setSelectedPatient, setSelectedEpisode]);

  return (
    <LoggedLayout>
      <Container>
        {!!episode?.patient && (
          <BackButton
            href={RoutesPath.patient.replace("[id]", episode?.patient_id)}
            text={
              <>
                Return to <strong>{episode?.patient?.name}</strong> profile
              </>
            }
          />
        )}
        <Text variant="h1">Pain Episode</Text>
        {!!episode && <EpisodeForm episode={episode} />}
        <Canvas />
      </Container>
    </LoggedLayout>
  );
}

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;

//6483da5531ceb825dbd11c06
