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
import Router, { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useSetSelectedEpisode } from "state/useSelectedEpisode";
import { useSetSelectedPatient } from "state/useSelectedPatient";
import styled from "styled-components";
import { scroller } from "react-scroll";
import { Button } from "@components/Button";
import { ConfirmActionModal } from "Modals/ConfirmActionModal";
import { useFormPrompt } from "@utils/hooks/useFormPrompt";
import { useAuth } from "@utils/hooks/useAuth";
import { UnsavedChangesDialog } from "@components/UnsavedChangesDialog";
import { storeGuestEpisodeId } from "@utils/localStorage/guestEpisode";
import { media } from "@styles/media-query";
import { MOBILE_MENU_HEIGHT } from "@components/SideMenu/components/MobileMenu";

export default function EpisodePage() {
  const router = useRouter();

  const { isLogged } = useAuth();

  useFormPrompt(!isLogged);

  const { id } = router.query as { id: string };

  const setSelectedPatient = useSetSelectedPatient();

  const setSelectedEpisode = useSetSelectedEpisode();

  const [saveModal, setSaveModal] = useState(false);

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

  const saveGuestEpisode = () => {
    storeGuestEpisodeId(id);
  };

  const goToRegister = () => {
    saveGuestEpisode();
    Router.push(RoutesPath.register);
  };

  const goToLogin = () => {
    saveGuestEpisode();
    Router.push(RoutesPath.login);
  };

  const closeSaveModal = () => setSaveModal(false);

  const openSaveModal = () => setSaveModal(true);

  useEffect(() => {
    if (episode) {
      if (episode.patient) {
        setSelectedPatient(episode.patient);
      }
      setSelectedEpisode(episode);
    }
  }, [episode, setSelectedPatient, setSelectedEpisode]);

  return (
    <LoggedLayout allowGuest={!getEpisodeById.isError}>
      <UnsavedChangesDialog shouldConfirmLeave={!isLogged && !saveModal} />
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
              <Text variant="h1">Pain Tracks</Text>
              <AddButton
                onClick={onCreateTrack}
                loading={createTrack.isLoading}
              />
            </FlexRow>
            <ListTrack episode_id={id} />
          </FlexColumn>
        </TrackContainer>
      </Container>
      {!isLogged && (
        <SaveButtonContainer>
          <Button onClick={openSaveModal} width="150px">
            Save
          </Button>
        </SaveButtonContainer>
      )}
      {saveModal && (
        <ConfirmActionModal
          description="To record information about a pain episode, an account is required. Simply sign in, and you'll have the ability to document as many episodes as you need, (and across various subjects—particularly beneficial if you're a doctor, veterinarian, or animal scientist)"
          confirmText="Create an account now"
          cancelText={
            <>
              Or if you already have an account,{" "}
              <Text variant="body2Bold" decoration="underline">
                login here
              </Text>
            </>
          }
          onClose={closeSaveModal}
          onConfirm={goToRegister}
          onCancel={goToLogin}
          title={false}
        />
      )}
    </LoggedLayout>
  );
}

const SaveButtonContainer = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  ${media.up.tablet`
    bottom: calc(${MOBILE_MENU_HEIGHT}px + 1rem);
    right: 1rem;
  `}
`;

const TrackContainer = styled.div`
  margin-top: 5rem;
`;

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;
