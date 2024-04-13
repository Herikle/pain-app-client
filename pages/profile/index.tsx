import { Badge } from "@components/Badge";
import { CallToAction } from "@components/CallToAction";
import { Table } from "@components/Table";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import Router from "next/router";
import { useGetPatients } from "@queries/patient/useGetPatients";
import { media } from "@styles/media-query";
import { getAgeByBirthDate } from "@utils/helpers/date";
import { useAuth } from "@utils/hooks/useAuth";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import { useSetChangeAccountInformationModal } from "Modals/ChangeAccountInformationModal/hook";
import { useMemo, useState } from "react";
import { useFiltersValue } from "state/useFilters";
import styled from "styled-components";
import { IPatient } from "types";
import { useCreatePatient } from "@queries/patient/usePatient";
import { Gear } from "@phosphor-icons/react";

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

  const renderAge = (birth_date: string | undefined) => {
    if (!birth_date) {
      return "-";
    }

    const age = getAgeByBirthDate(birth_date);

    return age;
  };

  const mountPatientHref = (patient: IPatient) => {
    return RoutesPath.patient.replace("[id]", patient._id);
  };

  const setChangeAccountInfo = useSetChangeAccountInformationModal();

  const openAccountInfoModal = () => {
    setChangeAccountInfo({});
  };

  const createPatient = useCreatePatient();

  const onCreatePatient = async () => {
    const created_patient = await createPatient.mutateAsync();
    Router.push(RoutesPath.patient.replace("[id]", created_patient._id));
  };

  return (
    <LoggedLayout>
      <Container data-cy="profile-page">
        <Text variant="h1">Your profile</Text>
        <Badge
          label={user?.name}
          description={user?.email}
          iconPath={IconsPath.Doctor}
          onClickEdit={openAccountInfoModal}
          EditPhorphorIcon={Gear}
          editIconAlwaysVisible
          iconProps={{
            "data-cy": "edit-account-info",
          }}
        />

        <Table
          columns={[
            {
              accessor: "name",
              label: "Name",
              options: {
                withOverflow: true,
              },
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
            title: "Subject List",
            onPlusClick: onCreatePatient,
            loading: createPatient.isLoading,
          }}
          CallToAction={
            <CallToAction
              text1="There are no subjects registered yet."
              text2="to create a subject."
              onClick={onCreatePatient}
              loading={createPatient.isLoading}
            />
          }
          mountHref={mountPatientHref}
          isLoading={getPatients.isLoading || getPatients.isPreviousData}
          pagination={{
            pages: getPatients?.data?.meta?.total_pages ?? 0,
            onChangePage: (page) => {
              setCurrentPage(page - 1);
            },
          }}
          addButtonProps={{
            "data-cy": "add-patient-button",
          }}
        />
      </Container>
    </LoggedLayout>
  );
}

const Container = styled(FlexColumn)`
  align-items: flex-start;
  width: 800px;
  gap: 2rem;

  ${media.up.laptop`
    width:100%; 
  `}
`;
