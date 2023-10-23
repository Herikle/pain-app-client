import { BackButton } from "@components/BackButton";
import { Badge } from "@components/Badge";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { useGetPatientById } from "@queries/patient/useGetPatients";
import { useEffect, useMemo } from "react";
import { UpdatePatientForm } from "@page-components/UpdatePatientForm";
import { useSetSelectedPatient } from "state/useSelectedPatient";
import { Table } from "@components/Table";
import { CallToAction } from "@components/CallToAction";
import { useCreateEpisode } from "@queries/episode/useEpisode";
import { useGetEpisodesList } from "@queries/episode/useGetEpisode";
import { IEpisode } from "types";
import { getDotDateFormat } from "@utils/helpers/date";

export default function Patient() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const setSelectedPatient = useSetSelectedPatient();

  const getPatientById = useGetPatientById({ id }, !!id);

  const getPatientEpisodes = useGetEpisodesList(
    {
      patient_id: id,
      page: 0,
      limit: 5,
    },
    !!id
  );

  const createEpisode = useCreateEpisode();

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

  const createEpisodeHandler = async () => {
    const episode_created = await createEpisode.mutateAsync({
      body: {
        patient_id: id,
      },
    });

    Router.push(RoutesPath.episode.replace("[id]", episode_created._id));
  };

  return (
    <LoggedLayout>
      <Container>
        <BackButton href={RoutesPath.profile} text="Return to your profile" />
        <Badge label={patient?.name} iconPath={IconsPath.Patient} />
        <Wrapper>
          {patient && <UpdatePatientForm patient={patient} />}
          <Table
            header={{
              title: "Pain Episodes list",
              onPlusClick: createEpisodeHandler,
              loading: createEpisode.isLoading,
            }}
            columns={[
              {
                accessor: "name",
                label: "Name",
              },
              {
                accessor: "createdAt",
                label: "Date",
                render: getDotDateFormat,
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
            CallToAction={
              <CallToAction
                text1="There are no episodes registered yet."
                text2="to create an episode."
                onClick={createEpisodeHandler}
                loading={createEpisode.isLoading}
              />
            }
          />
        </Wrapper>
      </Container>
    </LoggedLayout>
  );
}

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;

const Wrapper = styled(FlexColumn)`
  gap: 5rem;
`;
