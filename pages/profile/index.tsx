import { Badge } from "@components/Badge";
import { CallToAction } from "@components/CallToAction";
import { Table } from "@components/Table";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import Router from "next/router";
import {
  useGetPatients,
  useGetPatientsSugestion,
} from "@queries/patient/useGetPatients";
import { media } from "@styles/media-query";
import { getAgeByBirthDate } from "@utils/helpers/date";
import { useAuth } from "@utils/hooks/useAuth";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import { useSetChangeAccountInformationModal } from "@Modals/ChangeAccountInformationModal/hook";
import { useMemo, useState } from "react";
import { useFiltersValue } from "state/useFilters";
import styled from "styled-components";
import { IPatient } from "types";
import {
  useAddPatientToBookmark,
  useCreatePatient,
  useRemovePatientFromBookmark,
} from "@queries/patient/usePatient";
import { Gear, Star } from "@phosphor-icons/react";
import { useGetBookmarkPatients } from "@queries/bookmark-patients/useGetBookmarkPatients";
import { LoadingWrapper } from "@components/LoadingWrapper";
import { theme } from "@styles/theme";

const AddToBookMark = ({ patient_id }: { patient_id: string }) => {
  const addToBookmark = useAddPatientToBookmark();

  const addToBookMark = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await addToBookmark.mutateAsync({
      body: {
        patient_id: patient_id,
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

const RemoveFromBookMark = ({ patient_id }: { patient_id: string }) => {
  const removeFromBookmark = useRemovePatientFromBookmark();

  const removeFromBookMark = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await removeFromBookmark.mutateAsync({
      body: {
        patient_id: patient_id,
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

export default function ProfilePage() {
  const { user } = useAuth();

  const filters = useFiltersValue();

  const [currentPage, setCurrentPage] = useState(0);

  const getPatients = useGetPatients({
    page: currentPage,
    limit: 5,
    sortBy: "-createdAt",
    ...filters,
  });

  const [bookmarkCurrentPage, setBookmarkCurrentPage] = useState(0);

  const getBookmarkPatients = useGetBookmarkPatients({
    page: bookmarkCurrentPage,
    limit: 5,
    sortBy: "-createdAt",
    ...filters,
  });

  const [suggestionsCurrentPage, setSuggestionsCurrentPage] = useState(0);

  const getSuggestionPatients = useGetPatientsSugestion({
    page: suggestionsCurrentPage,
    limit: 5,
    sortBy: "-createdAt",
    ...filters,
  });

  const patients = useMemo(
    () => getPatients.data?.results ?? [],
    [getPatients.data]
  );

  const bookmarkPatients = useMemo(
    () => getBookmarkPatients.data?.results ?? [],
    [getBookmarkPatients.data]
  );

  const suggestionPatients = useMemo(
    () => getSuggestionPatients.data?.results ?? [],
    [getSuggestionPatients.data]
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
          iconPath={IconsPath.Doctor}
          onClickEdit={openAccountInfoModal}
          EditPhorphorIcon={Gear}
          editIconAlwaysVisible
          iconProps={{
            "data-cy": "edit-account-info",
          }}
        />
        <Text variant="h1">Subjects</Text>
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
            {
              accessor: "bookmarked",
              label: "",
              render: (bookmarked, item: IPatient) =>
                !!bookmarked ? (
                  <RemoveFromBookMark patient_id={item._id} />
                ) : (
                  <AddToBookMark patient_id={item._id} />
                ),
            },
          ]}
          data={patients}
          header={{
            title: "My contributions",
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
        <Table
          columns={[
            {
              accessor: "patient.name",
              label: "Name",
              options: {
                withOverflow: true,
              },
            },
            {
              accessor: "patient.birth_date",
              label: "Age",
              render: renderAge,
            },
            {
              accessor: "patient.episodes_count",
              label: "Pain Episodes",
              render: (value) => value ?? 0,
            },
            {
              accessor: "patient._id",
              queryAccessor: "bookmark",
              label: "",
              render: (_id: string) => <RemoveFromBookMark patient_id={_id} />,
            },
          ]}
          data={bookmarkPatients}
          header={{
            title: "Favorites",
          }}
          CallToAction={
            <CallToAction
              text1="There are no favorites yet."
              loading={createPatient.isLoading}
            />
          }
          mountHref={mountPatientHref}
          isLoading={
            getBookmarkPatients.isLoading || getBookmarkPatients.isPreviousData
          }
          pagination={{
            pages: getBookmarkPatients?.data?.meta?.total_pages ?? 0,
            onChangePage: (page) => {
              setBookmarkCurrentPage(page - 1);
            },
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
            {
              accessor: "_id",
              queryAccessor: "bookmark",
              label: "",
              render: (_id) => <AddToBookMark patient_id={_id} />,
            },
          ]}
          data={suggestionPatients}
          header={{
            title: "Suggestions",
          }}
          CallToAction={
            <CallToAction
              text1="There are no suggestions yet."
              loading={createPatient.isLoading}
            />
          }
          mountHref={mountPatientHref}
          isLoading={
            getSuggestionPatients.isLoading ||
            getSuggestionPatients.isPreviousData
          }
          pagination={{
            pages: getSuggestionPatients?.data?.meta?.total_pages ?? 0,
            onChangePage: (page) => {
              setSuggestionsCurrentPage(page - 1);
            },
          }}
        />
      </Container>
    </LoggedLayout>
  );
}

const StarContainer = styled.div`
  position: relative;

  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const Container = styled(FlexColumn)`
  align-items: flex-start;
  width: 1200px;
  gap: 2rem;

  ${media.up.laptop`
    width:100%; 
  `}
`;
