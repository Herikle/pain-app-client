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
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { TooltipContent } from "@components/TooltipContent";
import { Error404 } from "@page-components/errors/404";
import { useEpisodeStateValue } from "state/useEpisodeState";
import { TextField } from "@components/TextField";

export default function EpisodePage() {
  const router = useRouter();

  const { isLogged, isLoading } = useAuth();

  const { id } = router.query as { id: string };

  const setSelectedPatient = useSetSelectedPatient();

  const setSelectedEpisode = useSetSelectedEpisode();

  const deleteEpisode = useDeleteEpisode();

  const exportEpisode = useExportEpisode();

  const episodeState = useEpisodeStateValue(id);

  const [isSyncing, setIsSyncing] = useState(false);

  const [saveModal, setSaveModal] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [confirmExportEpisode, setConfirmExportEpisode] = useState(false);

  const [fileNameExported, setFileNameExported] = useState("");

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

  const saveGuestEpisode = useCallback(() => {
    storeGuestEpisodeId(id);
  }, [id]);

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

    setSelectedEpisode(null);

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

    const json = JSON.stringify(episodeExported, null, 2);
    const blob = new Blob([json], { type: "application/json" });

    const fileName = fileNameExported || getDefaultFileName();

    fileDownload(blob, `${fileName}.json`);

    setConfirmExportEpisode(false);
  };

  const getDefaultFileName = () => {
    const first05PatientName = episode?.patient?.name.slice(0, 5);

    const first10EpisodeName = episode?.name.slice(0, 10);

    const currentDate = new Date().toISOString().split("T")[0];

    const fileName = `Episode_${first05PatientName}_${first10EpisodeName}_${currentDate}`;

    return fileName;
  };

  const openConfirmExportation = () => {
    const fileName = getDefaultFileName();

    setFileNameExported(fileName);
    setConfirmExportEpisode(true);
  };

  const ignorePaths = useMemo(() => {
    if (isLogged) {
      return [];
    }

    return [RoutesPath.login, RoutesPath.register];
  }, [isLogged]);

  useEffect(() => {
    if (episode) {
      if (episode.patient) {
        setSelectedPatient(episode.patient);
      }
      setSelectedEpisode(episode);
    }
  }, [episode, setSelectedPatient, setSelectedEpisode]);

  useEffect(() => {
    if (!isLoading && !isLogged) {
      saveGuestEpisode();
    }
  }, [isLoading, isLogged, saveGuestEpisode]);

  return (
    <LoggedLayout allowGuest={!getEpisodeById.isError}>
      {getEpisodeById.isError ? (
        <Error404 />
      ) : (
        <>
          <UnsavedChangesDialog
            shouldConfirmLeave={!isLogged}
            pathnamesToIgnore={ignorePaths}
          />
          <Container data-cy="episode-page">
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
                  To effectively track your data, please{" "}
                  <Link
                    href={RoutesPath.register}
                    style={{ textDecoration: "underline" }}
                  >
                    create an account
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
              <Badge
                label={episodeState?.name ?? episode?.name}
                iconPath={IconsPath.Episode}
              />
              <FlexColumn gap={1.5} align="flex-end">
                <SyncingIndicator isSyncing={isSyncing} />
                {isLogged && (
                  <FlexRow>
                    <TooltipContent tooltip="Export episode">
                      <Export
                        size={24}
                        color={theme.colors.text_switched}
                        onClick={openConfirmExportation}
                        cursor="pointer"
                        data-cy="export-episode-button"
                      />
                    </TooltipContent>
                    <TooltipContent tooltip="Delete episode">
                      <Trash
                        size={24}
                        color={theme.colors.text_switched}
                        cursor="pointer"
                        data-cy="delete-episode-button"
                        onClick={() => setConfirmDelete(true)}
                      />
                    </TooltipContent>
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
          {saveModal && (
            <ConfirmActionModal
              description={
                <FlexColumn>
                  <Text variant="body2">
                    To effectively track and manage your pain episodes, creating
                    an account is required. Simply sign in, and {`you'll`} have
                    the ability to document as many episodes as you need, (and
                    across various subjects—particularly beneficial if{" "}
                    {`you're`} a doctor, veterinarian, or animal scientist).
                  </Text>
                </FlexColumn>
              }
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
              data-cy="delete-episode-modal"
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
              data-cy="export-episode-modal"
              onConfirm={onClickExport}
              onClose={() => {
                setConfirmExportEpisode(false);
              }}
              loading={exportEpisode.isLoading}
              title="Exporting"
              description={
                <FlexColumn>
                  You can choose a name for the file that will be exported.
                  <TextField
                    data-cy="export-episode-file-name-input"
                    value={fileNameExported}
                    onChange={(e) => setFileNameExported(e.target.value)}
                  />
                </FlexColumn>
              }
              confirmText="Export now"
              cancelText="Go back"
            />
          )}
        </>
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

const TrackContainer = styled.div``;

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
  width: 1180px;

  ${media.up.laptopL`
    width:100%;
  `}
`;
