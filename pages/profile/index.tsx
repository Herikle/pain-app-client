import { Badge } from "@components/Badge";
import { CallToAction } from "@components/CallToAction";
import { Table } from "@components/Table";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { PlusCircle } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { useAuth } from "@utils/hooks/useAuth";
import { IconsPath } from "@utils/icons";
import styled from "styled-components";

const FakeTableData = [
  {
    name: "John Doe",
    age: 30,
    episodes_count: 5,
  },
  {
    name: "Julia Smith",
    age: 37,
    episodes_count: 12,
  },
  {
    name: "Mary Jane",
    age: 27,
    episodes_count: 8,
  },
];

export default function ProfilePage() {
  const { user } = useAuth();

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
              accessor: "age",
              label: "Age",
            },
            {
              accessor: "episodes_count",
              label: "Pain Episodes",
            },
          ]}
          data={FakeTableData}
          header={{
            title: "Patient List",
            onPlusClick: () => console.log("Add Patient Clicked"),
          }}
          CallToAction={<CallToAction />}
        />
      </Container>
    </LoggedLayout>
  );
}

const TableContainer = styled.div``;

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;