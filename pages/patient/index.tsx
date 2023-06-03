import { BackButton } from "@components/BackButton";
import { Badge } from "@components/Badge";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { NewPatientForm } from "@page-components/NewPatientForm";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import styled from "styled-components";

export default function CreatePatient() {
  return (
    <LoggedLayout>
      <Container>
        <BackButton href={RoutesPath.profile} text="Return to your profile" />
        <Badge label="Add new patient" iconPath={IconsPath.Patient} />
        <NewPatientForm />
      </Container>
    </LoggedLayout>
  );
}

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;
