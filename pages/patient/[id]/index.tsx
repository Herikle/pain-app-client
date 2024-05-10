import { BackButton } from "@components/BackButton";
import { Badge } from "@components/Badge";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { useGetPatientById } from "@queries/patient/useGetPatients";
import { useEffect, useMemo, useState } from "react";
import { UpdatePatientForm } from "@page-components/UpdatePatientForm";
import { useSetSelectedPatient } from "state/useSelectedPatient";
import { Table } from "@components/Table";
import { CallToAction } from "@components/CallToAction";
import { useCreateEpisode } from "@queries/episode/useEpisode";
import { useGetEpisodesList } from "@queries/episode/useGetEpisode";
import { IEpisode } from "types";
import { getDateFormatedByLocale } from "@utils/helpers/date";
import { useSetDeletePatientModal } from "@Modals/DeletePatientModal/hook";
import { Trash } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { media } from "@styles/media-query";
import { SyncingIndicator } from "@components/SyncingIndicator";
import { TooltipContent } from "@components/TooltipContent";
import { useSetCreateEpisodeModal } from "@Modals/CreateEpisodeModal/hook";
import { useAuth } from "@utils/hooks/useAuth";
import { Error404 } from "@page-components/errors/404";
import { usePatientStateValue } from "state/usePatientState";
import { useFiltersValue } from "@state/useFilters";

export default function Patient() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const { isLogged, user } = useAuth();

  const [isSyncing, setIsSyncing] = useState(false);

  const patientState = usePatientStateValue(id);

  const setSelectedPatient = useSetSelectedPatient();

  const getPatientById = useGetPatientById({ id }, !!id);

  const filters = useFiltersValue();

  const getPatientEpisodes = useGetEpisodesList(
    {
      patient_id: id,
      page: 0,
      limit: 5,
      sortBy: "-createdAt",
      ...filters,
    },
    !!id
  );

  const setEpisodeModal = useSetCreateEpisodeModal();

  const patient = useMemo(() => getPatientById.data, [getPatientById.data]);

  const episodes = useMemo(
    () => getPatientEpisodes.data?.results ?? [],
    [getPatientEpisodes.data]
  );

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

  const patientType = patientState?.type ?? patient?.type;
  const patientName = patientState?.name ?? patient?.name;
  const patientCommonName = patientState?.commonName ?? patient?.common_name;

  const getPatientSpecie = () => {
    if (patientType === "animal") {
      return patientCommonName || patientType;
    }

    return patientType;
  };

  const isCreator = useMemo(() => {
    if (!patient) return false;
    if (!user) return false;

    return patient.creator_id === user._id;
  }, [patient, user]);

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
              <FlexColumn gap={1.5}>
                <SyncingIndicator isSyncing={isSyncing} />
                <FlexRow onClick={onDelete} data-cy="delete-patient-button">
                  <TooltipContent tooltip="Delete subject">
                    <Trash
                      size={24}
                      color={theme.colors.text_switched}
                      cursor="pointer"
                    />
                  </TooltipContent>
                </FlexRow>
              </FlexColumn>
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
                title: "Pain Episodes list",
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
              ]}
              mountHref={(episode: IEpisode) =>
                RoutesPath.episode.replace("[id]", episode._id)
              }
              isLoading={getPatientEpisodes.isLoading}
              data={episodes}
              addButtonProps={{
                "data-cy": "add-episode-button",
              }}
              CallToAction={
                <CallToAction
                  text1="There are no episodes registered yet."
                  text2="to create an episode."
                  onClick={
                    isLogged ? createEpisodeHandler : createEpisodeDirectHandler
                  }
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
