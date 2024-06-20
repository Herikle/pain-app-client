import { useDiscussionNavigation } from "@components/Discussion/Context/pages";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Chat } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { textElipsis } from "@utils/helpers/string";
import { formatDistanceToNow } from "date-fns";
import { transparentize } from "polished";
import styled from "styled-components";

type ReplyItem = {
  _id: string;
  user: {
    name: string;
  };
  createdAt: string;
  title: string;
  text: string;
};

type Props = {
  reply: ReplyItem;
};

export const Reply = ({ reply }: Props) => {
  return (
    <Container align="flex-start" gap={0.5}>
      <FlexRow>
        <Text variant="caption">
          <strong>{reply.user.name}</strong> •{" "}
          {formatDistanceToNow(new Date(reply.createdAt))}
        </Text>
      </FlexRow>
      <Text variant="h3">{reply.title}</Text>
      <Text variant="body2">{reply.text}</Text>
    </Container>
  );
};

const CounterContainer = styled(FlexRow)`
  background-color: ${transparentize(0.7, theme.colors.secondary_color)};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const Container = styled(FlexColumn)`
  padding: 1rem;
  transition: background-color 0.2s;
  border-radius: 4px;
`;
