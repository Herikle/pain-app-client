import { Text } from "@components/Text";
import { FlexRow } from "@design-components/Flex";
import { CaretRight } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { Evidences } from "@Modals/JustificationModal";
import { useSetJustificationModal } from "@Modals/JustificationModal/hooks";
import styled from "styled-components";
import { ISegmentJustification } from "types";

type JustificationProps = {
  justification: ISegmentJustification;
  isCreator?: boolean;
};

export const Justification = ({
  justification,
  isCreator,
}: JustificationProps) => {
  const setJustificationModal = useSetJustificationModal();
  const onClick = () => {
    setJustificationModal({
      justification,
      isCreator: isCreator,
    });
  };

  return (
    <Container onClick={onClick}>
      <Text variant="h3" fontWeight="400">
        {" "}
        {justification.title}
      </Text>
      {!!justification.type_of_evidence && (
        <FlexRow>
          <Text variant="body1Bold">
            {
              Evidences.find(
                (evidence) => evidence.value === justification.type_of_evidence
              )?.label
            }
          </Text>
          <CaretRight weight="bold" color={theme.colors.text_switched} />
        </FlexRow>
      )}
    </Container>
  );
};

const Container = styled(FlexRow)`
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;
