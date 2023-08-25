import { AddButton } from "@components/AddButton";
import { BackButton } from "@components/BackButton";
import { Paint } from "@components/Paint";
import { Text } from "@components/Text";
import { Track } from "@components/Track";
import { ListTrack } from "@components/Track/components/ListTracks";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { EpisodeForm } from "@page-components/EpisodeForm";
import { useGetEpisodeById } from "@queries/episode/useGetEpisode";
import { useCreateTrack } from "@queries/track/useTrack";
import { RoutesPath } from "@utils/routes";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useSetSelectedEpisode } from "state/useSelectedEpisode";
import { useSetSelectedPatient } from "state/useSelectedPatient";
import styled from "styled-components";
import { scroller } from "react-scroll";

export default function EpisodePage() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const setSelectedPatient = useSetSelectedPatient();

  const setSelectedEpisode = useSetSelectedEpisode();

  const getEpisodeById = useGetEpisodeById({ episode_id: id }, !!id);

  const episode = useMemo(() => getEpisodeById.data, [getEpisodeById.data]);

  const createTrack = useCreateTrack();

  const onCreateTrack = async () => {
    const track_created = await createTrack.mutateAsync({
      body: {
        episode_id: id,
      },
    });
    setTimeout(() => {
      scroller.scrollTo(`track_${track_created._id}`, {
        duration: 800,
        smooth: true,
        containerId: "main-content",
      });
    }, 250);
  };

  useEffect(() => {
    if (episode) {
      if (episode.patient) {
        setSelectedPatient(episode.patient);
      }
      setSelectedEpisode(episode);
    }
  }, [episode, setSelectedPatient, setSelectedEpisode]);

  console.log(getEpisodeById);

  return (
    <LoggedLayout allowGuest={!getEpisodeById.isError}>
      <Container>
        {!!episode?.patient_id && (
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
        <TrackContainer>
          <FlexColumn gap={4}>
            <FlexRow gap={0} justify="space-between">
              <Text variant="h1">Tracks</Text>
              <AddButton
                onClick={onCreateTrack}
                loading={createTrack.isLoading}
              />
            </FlexRow>
            <ListTrack episode_id={id} />
          </FlexColumn>
        </TrackContainer>
      </Container>
    </LoggedLayout>
  );
}

const TrackContainer = styled.div`
  margin-top: 5rem;
`;

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;
