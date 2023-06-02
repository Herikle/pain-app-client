import { Badge } from "@components/Badge";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { useAuth } from "@utils/hooks/useAuth";
import { IconsPath } from "@utils/icons";
import styled from "styled-components";

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
      </Container>
    </LoggedLayout>
  );
}

const Container = styled(FlexColumn)`
  align-items: flex-start;
  gap: 2rem;
`;
