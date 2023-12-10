import { Text } from "@components/Text";
import { FlexRow } from "@design-components/Flex";
import { useSetJustificationModal } from "Modals/JustificationModal/hooks";
import styled from "styled-components";
import { ISegmentJustification } from "types";
import { useForm, z, zodResolver } from "utils/helpers/form-validation";

type JustificationProps = {
  justification: ISegmentJustification;
};

export const Justification = ({ justification }: JustificationProps) => {
  const setJustificationModal = useSetJustificationModal();

  const onClick = () => {
    setJustificationModal({
      justification,
    });
  };

  return (
    <Container onClick={onClick}>
      <Text variant="h3" fontWeight="400">
        {" "}
        {justification.title}
      </Text>
      <Text variant="body1Bold">{justification.type_of_evidence}</Text>
    </Container>
  );
};

const Container = styled(FlexRow)`
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;
