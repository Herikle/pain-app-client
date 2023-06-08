import { Badge } from "@components/Badge";
import { CallToAction } from "@components/CallToAction";
import { Table } from "@components/Table";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { AccountForm } from "@page-components/AccountForm";
import { PasswordSettingsForm } from "@page-components/PasswordSettingsForm";
import { useGetPatients } from "@queries/patient/useGetPatients";
import { getAgeByBirthDate } from "@utils/helpers/date";
import { useAuth } from "@utils/hooks/useAuth";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import { useMemo, useState } from "react";
import { useFiltersValue } from "state/useFilters";
import styled from "styled-components";
import { IPatient } from "types";

export default function ProfilePage() {
  const { user } = useAuth();

  const filters = useFiltersValue();

  const [currentPage, setCurrentPage] = useState(0);

  const getPatients = useGetPatients({
    page: currentPage,
    limit: 5,
    ...filters,
  });

  const patients = useMemo(
    () => getPatients.data?.results ?? [],
    [getPatients.data]
  );

  const renderAge = (birth_date: string) => {
    const age = getAgeByBirthDate(birth_date);

    return age;
  };

  const mountPatientHref = (patient: IPatient) => {
    return RoutesPath.patient.replace(":id", patient._id);
  };

  return (
    <LoggedLayout>
      <Container>
        <Text variant="h1">Your profile</Text>
        <Badge
          label={user?.name}
          description={user?.email}
          iconPath={IconsPath.Doctor}
        />
        <Table
          columns={[
            {
              accessor: "name",
              label: "Name",
            },
            {
              accessor: "birth_date",
              label: "Age",
              render: renderAge,
            },
            {
              accessor: "episodes_count",
              label: "Pain Episodes",
              render: (value) => value ?? 0,
            },
          ]}
          data={patients}
          header={{
            title: "Patient List",
            plusHref: RoutesPath.new_patient,
          }}
          CallToAction={<CallToAction />}
          mountHref={mountPatientHref}
          isLoading={getPatients.isLoading || getPatients.isPreviousData}
          pagination={{
            pages: getPatients?.data?.meta?.total_pages ?? 0,
            onChangePage: (page) => {
              setCurrentPage(page - 1);
            },
          }}
        />
        <FormContainer>
          <AccountForm />
        </FormContainer>
        <FormContainer>
          <PasswordSettingsForm />
        </FormContainer>
      </Container>
    </LoggedLayout>
  );
}

const FormContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Container = styled(FlexColumn)`
  align-items: flex-start;
  width: fit-content;
  gap: 2rem;
`;
