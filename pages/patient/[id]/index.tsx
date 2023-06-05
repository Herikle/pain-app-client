import { BackButton } from "@components/BackButton";
import { Badge } from "@components/Badge";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useGetPatientById } from "@queries/patient/useGetPatients";
import { useEffect, useMemo } from "react";
import { UpdatePatientForm } from "@page-components/UpdatePatientForm";
import { useSetSelectedPatient } from "state/useSelectedPatient";
import { Table } from "@components/Table";

export default function Patient() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const setSelectedPatient = useSetSelectedPatient();

  const getPatientById = useGetPatientById({ id }, !!id);

  const patient = useMemo(() => getPatientById.data, [getPatientById.data]);

  useEffect(() => {
    if (patient) {
      setSelectedPatient(patient);
    }
  }, [patient, setSelectedPatient]);

  return (
    <LoggedLayout>
      <Container>
        <BackButton href={RoutesPath.profile} text="Return to your profile" />
        <Badge label={patient?.name} iconPath={IconsPath.Patient} />
        <Wrapper>
          {patient && <UpdatePatientForm patient={patient} />}
          <Table
            header={{
              title: "Episodes list",
              onPlusClick: () => alert("Not implemented yet"),
            }}
            columns={[
              {
                accessor: "name",
                label: "Name",
              },
              {
                accessor: "date",
                label: "Date",
              },
              {
                accessor: "tracks",
                label: "N° of tracks",
              },
            ]}
            data={[
              {
                name: "Pain episode 1",
                date: "16.03.23",
                tracks: 3,
              },
              {
                name: "Pain episode 2",
                date: "16.03.23",
                tracks: 3,
              },
              {
                name: "Pain episode 3",
                date: "16.03.23",
                tracks: 3,
              },
            ]}
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

const Wrapper = styled(FlexRow)`
  justify-content: unset;
  align-items: flex-start;
  gap: 5rem;
`;
