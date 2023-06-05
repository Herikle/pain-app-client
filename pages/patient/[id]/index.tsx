import { BackButton } from "@components/BackButton";
import { Badge } from "@components/Badge";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useGetPatientById } from "@queries/patient/useGetPatients";
import { useMemo } from "react";

export default function Patient() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const getPatientById = useGetPatientById({ id }, !!id);

  const patient = useMemo(() => getPatientById.data, [getPatientById.data]);

  return (
    <LoggedLayout>
      <Container>
        <BackButton href={RoutesPath.profile} text="Return to your profile" />
        <Badge label={patient?.name} iconPath={IconsPath.Patient} />
      </Container>
    </LoggedLayout>
  );
}

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;
