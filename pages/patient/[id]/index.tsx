import { BackButton } from "@components/BackButton";
import { Badge } from "@components/Badge";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useGetPatientById } from "@queries/patient/useGetPatients";
import { useEffect, useMemo } from "react";
import { UpdatePatientForm } from "@page-components/UpdatePatientForm";
import { useSetSelectedPatient } from "state/useSelectedPatient";

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
        {patient && <UpdatePatientForm patient={patient} />}
      </Container>
    </LoggedLayout>
  );
}

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;
