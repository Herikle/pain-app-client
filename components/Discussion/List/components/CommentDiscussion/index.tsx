import { useDiscussionNavigation } from "@components/Discussion/Context/pages";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Chat } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { textElipsis } from "@utils/helpers/string";
import { formatDistanceToNow } from "date-fns";
import { transparentize } from "polished";
import styled from "styled-components";

type CommentDiscussion = {
  _id: string;
  user: {
    name: string;
  };
  createdAt: string;
  title: string;
  text: string;
};

type Props = {
  comment: CommentDiscussion;
};

export const CommentDiscussion = ({ comment }: Props) => {
  const { setPage } = useDiscussionNavigation();

  return (
    <Container
      align="flex-start"
      gap={0.5}
      onClick={() => {
        setPage({
          path: "discussion",
          discussion_id: comment._id,
        });
      }}
    >
      <FlexRow>
        <Text variant="caption">
          <strong>{comment.user.name}</strong> •{" "}
          {formatDistanceToNow(new Date(comment.createdAt))}
        </Text>
      </FlexRow>
      <Text variant="h3">{comment.title}</Text>
      <Text variant="body2">{textElipsis(comment.text, 256)}</Text>
      <FlexRow>
        <CounterContainer>
          <Chat />
          <Text variant="caption">0</Text>
        </CounterContainer>
      </FlexRow>
    </Container>
  );
};

const CounterContainer = styled(FlexRow)`
  background-color: ${transparentize(0.7, theme.colors.secondary_color)};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const Container = styled(FlexColumn)`
  cursor: pointer;
  padding: 1rem;
  transition: background-color 0.2s;
  border-radius: 4px;
  &:hover {
    background-color: ${theme.colors.hover_state};
  }
`;
