import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { CheckCircle, Trash, XCircle } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import styled from "styled-components";
import { IIntervetion } from "types";

type InterventionCard = {
  intervention: IIntervetion;
};

export const InterventionCard = ({ intervention }: InterventionCard) => {
  const { name, effective, datetime } = intervention;

  return (
    <Container justify="space-between">
      <DetailsContainer align="flex-start">
        <NameContainer>
          <Text variant="body2Bold">{name}</Text>
          {effective ? (
            <CheckCircle
              size={16}
              color={theme.colors.green_success}
              weight="fill"
            />
          ) : (
            <XCircle
              size={16}
              color={theme.colors.dark_red_danger}
              weight="fill"
            />
          )}
        </NameContainer>
        <Text>{datetime}</Text>
      </DetailsContainer>
      <DeleteContainer>
        <Trash size={20} color={theme.colors.red_danger} />
      </DeleteContainer>
    </Container>
  );
};

const DeleteContainer = styled(FlexRow)`
  background-color: ${theme.colors.pure_white};
  padding: 0.5rem;
  border-radius: 50%;
`;

const NameContainer = styled(FlexRow)``;

const DetailsContainer = styled(FlexColumn)``;

const Container = styled(FlexRow)`
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.hover_state};
  }
`;
