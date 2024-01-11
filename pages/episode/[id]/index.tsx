import { AddButton } from "@components/AddButton";
import { BackButton } from "@components/BackButton";
import { Text } from "@components/Text";
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
import { ConfirmActionModal } from "Modals/ConfirmActionModal";
import { useAuth } from "@utils/hooks/useAuth";
import { storeGuestEpisodeId } from "@utils/localStorage/guestEpisode";
import { media } from "@styles/media-query";
import { MOBILE_MENU_HEIGHT } from "@components/SideMenu/components/MobileMenu";
import { IconsPath } from "@utils/icons";
import { Badge } from "@components/Badge";
import { Export, Question, Trash } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import {
  useDeleteEpisode,
  useExportEpisode,
} from "@queries/episode/useEpisode";
import { SyncingIndicator } from "@components/SyncingIndicator";
import fileDownload from "js-file-download";
import Link from "next/link";
import { UnsavedChangesDialog } from "@components/UnsavedChangesDialog";

export default function EpisodePage() {
  const router = useRouter();

  const { isLogged } = useAuth();

  const { id } = router.query as { id: string };

  const setSelectedPatient = useSetSelectedPatient();

  const setSelectedEpisode = useSetSelectedEpisode();

  const deleteEpisode = useDeleteEpisode();

  const exportEpisode = useExportEpisode();

  const [isSyncing, setIsSyncing] = useState(false);

  const [saveModal, setSaveModal] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [confirmExportEpisode, setConfirmExportEpisode] = useState(false);

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

  const onDeleteEpisode = async () => {
    await deleteEpisode.mutateAsync({
      params: {
        episode_id: id,
      },
    });

    if (!!episode?.patient_id) {
      Router.replace(RoutesPath.patient.replace("[id]", episode.patient_id));
    }
  };

  const onClickExport = async () => {
    const episodeExported = await exportEpisode.mutateAsync({
      params: {
        episode_id: id,
      },
    });

    const first05PatientName = episode?.patient?.name.slice(0, 5);

    const first10EpisodeName = episode?.name.slice(0, 10);

    const currentDate = new Date().toISOString().split("T")[0];

    const fileName = `Episode_${first05PatientName}_${first10EpisodeName}_${currentDate}`;
    const json = JSON.stringify(episodeExported, null, 2);
    const blob = new Blob([json], { type: "application/json" });

    fileDownload(blob, `${fileName}.json`);

    setConfirmExportEpisode(false);
  };

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
      <UnsavedChangesDialog shouldConfirmLeave={!isLogged} />
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
        {!isLogged && (
          <FlexRow>
            <Question
              size={16}
              weight="fill"
              cursor="pointer"
              onClick={openSaveModal}
            />
            <Text variant="body1">
              To save this episode and tracks, you gonna need an account.{" "}
              <Link
                href={RoutesPath.register}
                style={{ textDecoration: "underline" }}
              >
                Create an account
              </Link>{" "}
              or{" "}
              <Link
                href={RoutesPath.login}
                style={{ textDecoration: "underline" }}
              >
                login
              </Link>
            </Text>
          </FlexRow>
        )}
        <EpisodeBadgeContainer justify="space-between">
          <Badge label={episode?.name} iconPath={IconsPath.Episode} />
          <FlexColumn gap={1.5} align="flex-end">
            <SyncingIndicator isSyncing={isSyncing} />
            {isLogged && (
              <FlexRow>
                <Export
                  size={24}
                  color={theme.colors.text_switched}
                  onClick={() => {
                    setConfirmExportEpisode(true);
                  }}
                  cursor="pointer"
                />
                <Trash
                  size={24}
                  color={theme.colors.text_switched}
                  cursor="pointer"
                  onClick={() => setConfirmDelete(true)}
                />
              </FlexRow>
            )}
          </FlexColumn>
        </EpisodeBadgeContainer>
        {!!episode && (
          <EpisodeForm episode={episode} onIsSyncingChange={setIsSyncing} />
        )}
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
      {/* {!isLogged && (
        <SaveButtonContainer>
          <Button onClick={openSaveModal} width="150px">
            Save
          </Button>
        </SaveButtonContainer>
      )} */}
      {saveModal && (
        <ConfirmActionModal
          description="To record information about a pain episode, an account is required. Simply sign in, and you'll have the ability to document as many episodes as you need, (and across various subjects—particularly beneficial if you're a doctor, veterinarian, or animal scientist)"
          confirmText="Create an account now"
          cancelText={
            <Text variant="body2">
              Or if you already have an account,{" "}
              <Link
                href={RoutesPath.login}
                style={{ textDecoration: "underline" }}
              >
                login here
              </Link>
            </Text>
          }
          onClose={closeSaveModal}
          onConfirm={goToRegister}
          onCancel={goToLogin}
          title={false}
        />
      )}
      {confirmDelete && (
        <ConfirmActionModal
          onConfirm={onDeleteEpisode}
          onClose={() => {
            setConfirmDelete(false);
          }}
          loading={deleteEpisode.isLoading}
          description="Are you sure you want to delete this episode? This action cannot be undone."
        />
      )}
      {confirmExportEpisode && (
        <ConfirmActionModal
          onConfirm={onClickExport}
          onClose={() => {
            setConfirmExportEpisode(false);
          }}
          loading={exportEpisode.isLoading}
          title="Export Episode"
          description="Would you like to export this episode as a JSON file?"
          confirmText="Export"
          cancelText="Cancel"
        />
      )}
    </LoggedLayout>
  );
}

const EpisodeBadgeContainer = styled(FlexRow)`
  width: 1180px;

  ${media.up.laptopL`
    width:100%;
  `}
`;

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
