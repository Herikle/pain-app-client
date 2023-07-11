import { AddButton } from "@components/AddButton";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { IconsPath } from "@utils/icons";
import Image from "next/image";
import styled from "styled-components";

export const InterventionPage = () => {
  return (
    <Container>
      <ListIntervention>
        <AddTitle justify="space-between">
          <FlexRow>
            <Image
              src={IconsPath.Invervention}
              width={32}
              height={32}
              alt="Intervention Icon"
            />
            <Text variant="body2Bold">Intervention</Text>
          </FlexRow>
          <AddButton />
        </AddTitle>
      </ListIntervention>
      <Observation></Observation>
    </Container>
  );
};

const AddTitle = styled(FlexRow)`
  width: 100%;
`;

const Observation = styled(FlexColumn)`
  width: 50%;
`;

const ListIntervention = styled(FlexColumn)`
  width: 50%;
`;

const Container = styled(FlexRow)``;
