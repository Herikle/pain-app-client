import { BackButton } from "@components/BackButton";
import { Badge } from "@components/Badge";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { useGetPatientById } from "@queries/patient/useGetPatients";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { UpdatePatientForm } from "@page-components/UpdatePatientForm";
import { useSetSelectedPatient } from "state/useSelectedPatient";
import { Table } from "@components/Table";
import { CallToAction } from "@components/CallToAction";
import {
  useAddEpisodeToBookmark,
  useCreateEpisode,
  useRemoveEpisodeFromBookmark,
} from "@queries/episode/useEpisode";
import {
  useGetEpisodesList,
  useGetEpisodesSugestion,
} from "@queries/episode/useGetEpisode";
import { IEpisode } from "types";
import { getDateFormatedByLocale } from "@utils/helpers/date";
import { useSetDeletePatientModal } from "@Modals/DeletePatientModal/hook";
import { ChatCircle, Star, Trash } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { media } from "@styles/media-query";
import { SyncingIndicator } from "@components/SyncingIndicator";
import { TooltipContent } from "@components/TooltipContent";
import { useSetCreateEpisodeModal } from "@Modals/CreateEpisodeModal/hook";
import { useAuth } from "@utils/hooks/useAuth";
import { Error404 } from "@page-components/errors/404";
import { usePatientStateValue } from "state/usePatientState";
import { useFiltersValue } from "@state/useFilters";
import { LoadingWrapper } from "@components/LoadingWrapper";
import {
  BookMarkEpisodeItem,
  useGetBookmarkEpisodes,
} from "@queries/bookmark-episodes/useGetBookmarkPatients";
import { DiscussionOpener } from "@components/DiscussionOpener";

const AddToBookMark = ({ episode_id }: { episode_id: string }) => {
  const addToBookmark = useAddEpisodeToBookmark();

  const addToBookMark = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await addToBookmark.mutateAsync({
      body: {
        episode_id: episode_id,
      },
    });
  };

  return (
    <StarContainer>
      <LoadingWrapper
        overContainer
        size={16}
        loading={addToBookmark.isLoading}
      />
      <Star size={20} onClick={addToBookMark} />
    </StarContainer>
  );
};

const RemoveFromBookMark = ({ episode_id }: { episode_id: string }) => {
  const removeFromBookmark = useRemoveEpisodeFromBookmark();

  const removeFromBookMark = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await removeFromBookmark.mutateAsync({
      body: {
        episode_id: episode_id,
      },
    });
  };

  return (
    <StarContainer>
      <LoadingWrapper
        overContainer
        size={16}
        loading={removeFromBookmark.isLoading}
      />
      <Star size={20} weight="fill" onClick={removeFromBookMark} />
    </StarContainer>
  );
};

const StarContainer = styled.div`
  position: relative;

  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

export default function Patient() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const { isLogged, user } = useAuth();

  const [isSyncing, setIsSyncing] = useState(false);

  const patientState = usePatientStateValue(id);

  const setSelectedPatient = useSetSelectedPatient();

  const getPatientById = useGetPatientById({ id }, !!id);

  const filters = useFiltersValue();

  const [patientEpisodesPage, setPatientEpisodesPage] = useState(0);

  const getPatientEpisodes = useGetEpisodesList(
    {
      patient_id: id,
      page: patientEpisodesPage,
      limit: 5,
      sortBy: "-createdAt",
      ...filters,
    },
    !!id
  );

  const episodes = useMemo(
    () => getPatientEpisodes.data?.results ?? [],
    [getPatientEpisodes.data]
  );

  const [episodeSuggestionPage, setEpisodeSuggestionPage] = useState(0);

  const getEpisodesSuggestions = useGetEpisodesSugestion({
    page: episodeSuggestionPage,
    limit: 5,
    sortBy: "-createdAt",
    ...filters,
  });

  const episodesSuggestions = useMemo(
    () => getEpisodesSuggestions.data?.results ?? [],
    [getEpisodesSuggestions.data]
  );

  const [episodesBookmarkPage, setEpisodesBookmarkPage] = useState(0);

  const getEpisodesBookmark = useGetBookmarkEpisodes({
    page: episodesBookmarkPage,
    limit: 5,
    sortBy: "-createdAt",
    ...filters,
  });

  const episodesBookmark = useMemo(
    () => getEpisodesBookmark.data?.results ?? [],
    [getEpisodesBookmark.data]
  );

  const setEpisodeModal = useSetCreateEpisodeModal();

  const patient = useMemo(() => getPatientById.data, [getPatientById.data]);

  useEffect(() => {
    if (patient) {
      setSelectedPatient(patient);
    }
  }, [patient, setSelectedPatient]);

  const createEpisode = useCreateEpisode();

  const createEpisodeDirectHandler = async () => {
    const episode_created = await createEpisode.mutateAsync({
      body: {
        patient_id: patient?._id,
      },
    });

    Router.push(RoutesPath.episode.replace("[id]", episode_created._id));
  };

  const createEpisodeHandler = async () => {
    if (!patient) return;
    setEpisodeModal({
      patient_id: patient?._id,
    });
  };

  const setDeletePatientModal = useSetDeletePatientModal();

  const onDelete = () => {
    if (!!patient) {
      setDeletePatientModal({
        patient_id: patient?._id,
        patient,
      });
    }
  };

  const patientHelper = patientState ?? patient;

  const patientType = patientHelper?.type;
  const patientName = patientHelper?.name;
  const patientCommonName = patientHelper?.common_name;

  const getPatientSpecie = () => {
    if (patientType === "animal") {
      return patientCommonName || patientType;
    }

    return patientType;
  };

  const mountEpisodeHref = (episode: IEpisode) => {
    return RoutesPath.episode.replace("[id]", episode._id);
  };

  const mountEpisodeHrefByBookmark = (bookmark: BookMarkEpisodeItem) => {
    return RoutesPath.episode.replace("[id]", bookmark.episode_id);
  };

  const isCreator = useMemo(() => {
    if (!patient) return false;
    if (!user) return false;

    return patient.creator_id === user._id;
  }, [patient, user]);

  const getSuggestionTdStyle = (item: IEpisode): CSSProperties | null => {
    const patient = item.patient;
    if (!patient) return null;

    const itemPatientType = patient.type;
    if (!itemPatientType) return null;

    if (itemPatientType === patientType) return null;

    return {
      color: theme.colors.primary,
    };
  };

  const renderPatientScientificName = (item: IEpisode) => {
    const patient = item.patient;
    if (!patient) return null;

    const itemPatientType = patient.type;
    if (!itemPatientType) return null;

    if (itemPatientType === patientType) return null;

    if (itemPatientType === "human") return "Human";

    return patient.scientific_name ?? itemPatientType;
  };

  return (
    <LoggedLayout>
      {getPatientById.isError ? (
        <Error404 />
      ) : (
        <Container data-cy="patient-page">
          <BackButton href={RoutesPath.profile} text="Return to your profile" />
          <UserBadgeContainer justify="space-between">
            <Badge
              label={patientName}
              description={getPatientSpecie()}
              descriptionVariant="h2"
              descriptionWeight="400"
              iconPath={
                patientType === "animal" ? IconsPath.Animal : IconsPath.Patient
              }
            />
            {isCreator && (
              <FlexRow gap={1}>
                {isLogged && !!id && (
                  <DiscussionOpener
                    breadcrumb={[patientName ?? ""]}
                    patient_id={id}
                    episode_id={null}
                    track_id={null}
                    segment_id={null}
                  />
                )}
                <FlexRow onClick={onDelete} data-cy="delete-patient-button">
                  <TooltipContent tooltip="Delete subject">
                    <Trash
                      size={24}
                      color={theme.colors.text_switched}
                      cursor="pointer"
                    />
                  </TooltipContent>
                </FlexRow>
                <SyncingIndicator isSyncing={isSyncing} />
              </FlexRow>
            )}
          </UserBadgeContainer>
          <Wrapper>
            {patient && isCreator && (
              <UpdatePatientForm
                patient={patient}
                onIsSyncingChange={setIsSyncing}
              />
            )}
            <Table
              header={{
                title: "Episodes list",
                onPlusClick: isCreator
                  ? isLogged
                    ? createEpisodeHandler
                    : createEpisodeDirectHandler
                  : undefined,
              }}
              columns={[
                {
                  accessor: "name",
                  label: "Name",
                },
                {
                  accessor: "createdAt",
                  label: "Date",
                  render: getDateFormatedByLocale,
                },
                {
                  accessor: "tracks_count",
                  label: "N° of tracks",
                },
                {
                  accessor: "bookmarked",
                  queryAccessor: "bookmark",
                  label: "",
                  render: (bookmarked, item: IEpisode) =>
                    !!bookmarked ? (
                      <RemoveFromBookMark episode_id={item._id} />
                    ) : (
                      <AddToBookMark episode_id={item._id} />
                    ),
                },
              ]}
              mountHref={mountEpisodeHref}
              isLoading={getPatientEpisodes.isLoading}
              data={episodes}
              addButtonProps={{
                "data-cy": "add-episode-button",
              }}
              CallToAction={
                isCreator ? (
                  <CallToAction
                    text1="There are no episodes registered yet."
                    text2="to create an episode."
                    onClick={
                      isLogged
                        ? createEpisodeHandler
                        : createEpisodeDirectHandler
                    }
                  />
                ) : (
                  <CallToAction text1="There are no episodes registered yet." />
                )
              }
              pagination={{
                onChangePage: (page) => setPatientEpisodesPage(page - 1),
                pages: getPatientEpisodes?.data?.meta?.total_pages ?? 0,
              }}
            />
            <Table
              header={{
                title: "Bookmarks",
              }}
              data={episodesBookmark}
              isLoading={getEpisodesBookmark.isLoading}
              columns={[
                {
                  accessor: "episode.name",
                  label: "Name",
                  tdStyle: (item: { episode: IEpisode }) =>
                    getSuggestionTdStyle(item.episode),
                },
                {
                  accessor: "episode.createdAt",
                  label: "Date",
                  render: getDateFormatedByLocale,
                  tdStyle: (item: { episode: IEpisode }) =>
                    getSuggestionTdStyle(item.episode),
                },
                {
                  accessor: "episode.tracks_count",
                  label: "N° of tracks",
                  tdStyle: (item: { episode: IEpisode }) =>
                    getSuggestionTdStyle(item.episode),
                },
                {
                  accessor: "episode",
                  queryAccessor: "bookmark",
                  label: "",
                  render: (episode: IEpisode) => (
                    <RemoveFromBookMark episode_id={episode._id} />
                  ),
                  tdStyle: (item: { episode: IEpisode }) =>
                    getSuggestionTdStyle(item.episode),
                },
                {
                  accessor: "episode",
                  label: "",
                  render: (item: IEpisode) => renderPatientScientificName(item),
                  tdStyle: (item: { episode: IEpisode }) =>
                    getSuggestionTdStyle(item.episode),
                  noSort: true,
                },
              ]}
              pagination={{
                onChangePage: (page) => setEpisodesBookmarkPage(page - 1),
                pages: getEpisodesBookmark?.data?.meta?.total_pages ?? 0,
              }}
              mountHref={mountEpisodeHrefByBookmark}
              CallToAction={
                <CallToAction
                  text1="There are no bookmarks yet."
                  loading={false}
                />
              }
            />
            <Table
              header={{
                title: "Suggestions",
              }}
              columns={[
                {
                  accessor: "name",
                  label: "Name",
                  tdStyle: (item: IEpisode) => getSuggestionTdStyle(item),
                },
                {
                  accessor: "createdAt",
                  label: "Date",
                  render: getDateFormatedByLocale,
                  tdStyle: (item: IEpisode) => getSuggestionTdStyle(item),
                },
                {
                  accessor: "tracks_count",
                  label: "N° of tracks",
                  tdStyle: (item: IEpisode) => getSuggestionTdStyle(item),
                },
                {
                  accessor: "_id",
                  queryAccessor: "bookmark",
                  label: "",
                  render: (_id) => <AddToBookMark episode_id={_id} />,
                  tdStyle: (item: IEpisode) => getSuggestionTdStyle(item),
                },
                {
                  accessor: "_id",
                  label: "",
                  render: (_, item: IEpisode) =>
                    renderPatientScientificName(item),
                  tdStyle: (item: IEpisode) => getSuggestionTdStyle(item),
                  noSort: true,
                },
              ]}
              data={episodesSuggestions}
              isLoading={getEpisodesSuggestions.isLoading}
              pagination={{
                onChangePage: (page) => setEpisodeSuggestionPage(page - 1),
                pages: getEpisodesSuggestions?.data?.meta?.total_pages ?? 0,
              }}
              mountHref={mountEpisodeHref}
              CallToAction={
                <CallToAction
                  text1="There are no suggestions yet."
                  loading={false}
                />
              }
            />
          </Wrapper>
        </Container>
      )}
    </LoggedLayout>
  );
}

const UserBadgeContainer = styled(FlexRow)`
  width: 100%;
`;

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
  width: 710px;

  ${media.up.laptop`
    width:100%;
  `}
`;

const Wrapper = styled(FlexColumn)`
  gap: 5rem;
`;
