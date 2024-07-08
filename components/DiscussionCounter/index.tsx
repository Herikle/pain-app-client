import { Text } from "@components/Text";
import { ChatCircle } from "@phosphor-icons/react";
import styled from "styled-components";

type Props = {
  count: number;
};

export const DiscussionCounter = ({ count }: Props) => {
  if (count === 0) return null;

  return (
    <Container>
      <ChatCircle size={28} />
      <TextContainer>
        <Text variant="caption">{count}</Text>
      </TextContainer>
    </Container>
  );
};

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  transform: translate(15px, -5px);
`;
