import { LoadingWrapper } from "@components/LoadingWrapper";
import { useDiscussionNavigation } from "../Context/pages";

import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Chat } from "@phosphor-icons/react";
import { useGetDiscussionById } from "@queries/discussion/useGetDiscussion";
import { theme } from "@styles/theme";
import { textElipsis } from "@utils/helpers/string";
import { formatDistanceToNow } from "date-fns";
import { transparentize } from "polished";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { BackButton } from "@components/BackButton";
import { useCreateDiscussion } from "@queries/discussion/useDiscussion";
import { TextArea } from "@components/TextArea";
import { Button } from "@components/Button";
import { ListReplies } from "./components/ListReplies";
import { media } from "@styles/media-query";

export const DiscussionThread = () => {
  const { page, setPage, episode } = useDiscussionNavigation();

  const [text, setText] = useState("");

  const [hasFocus, setHasFocus] = useState(false);

  const hasValue = text.length > 0;

  const isActive = hasValue || hasFocus;

  const discussionId = useMemo(() => {
    if (page.path === "discussion") {
      return page.discussion_id;
    }

    return null;
  }, [page]);

  const getComment = useGetDiscussionById(discussionId);

  const comment = useMemo(() => getComment.data, [getComment.data]);

  const createCommentMutation = useCreateDiscussion();

  const createDiscussion = async () => {
    const discussion_id = discussionId;

    if (!discussion_id) return;

    await createCommentMutation.mutateAsync({
      episode_id: episode._id,
      text: text,
      parent_id: discussion_id,
    });

    setText("");
  };

  return (
    <FlexColumn>
      <BackButton
        text="Return to discussion list"
        onClick={() => setPage({ path: "list" })}
      />
      <ThreadBody>
        <LoadingWrapper loading={getComment.isLoading}>
          {!!comment && (
            <>
              <Container align="flex-start" gap={0.5}>
                <FlexRow>
                  <Text variant="caption">
                    <strong>{comment.user.name}</strong> •{" "}
                    {formatDistanceToNow(new Date(comment.createdAt))}
                  </Text>
                </FlexRow>
                <Text variant="h3">{comment.title}</Text>
                <Text variant="body2">{comment.text}</Text>
                <FlexRow>
                  <CounterContainer>
                    <Chat />
                    <Text variant="caption">0</Text>
                  </CounterContainer>
                </FlexRow>
              </Container>
            </>
          )}

          <AddCommentContainer align="flex-end">
            <TextArea
              fullWidth
              placeholder="Add a comment"
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
              minRows={isActive ? 4 : 1}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {isActive && (
              <FlexRow>
                <Button
                  variant="text"
                  textColor="pure_black"
                  color="pure_white"
                  onClick={() => {
                    setText("");
                    setHasFocus(false);
                  }}
                  disabled={createCommentMutation.isLoading}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  loading={createCommentMutation.isLoading}
                  onClick={createDiscussion}
                >
                  Comment
                </Button>
              </FlexRow>
            )}
          </AddCommentContainer>
          {!!discussionId && (
            <ListReplies episode_id={episode._id} parent_id={discussionId} />
          )}
        </LoadingWrapper>
      </ThreadBody>
    </FlexColumn>
  );
};

const AddCommentContainer = styled(FlexColumn)`
  min-height: 8.5rem;
`;

const CounterContainer = styled(FlexRow)`
  background-color: ${transparentize(0.7, theme.colors.secondary_color)};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const ThreadBody = styled(FlexColumn)`
  height: calc(100% - 125px);
  overflow-y: auto;

  ${media.up.laptopL`
    height: calc(100% - 200px);
  `}
`;

const Container = styled(FlexColumn)`
  padding: 1rem;
  transition: background-color 0.2s;
  border-radius: 4px;
`;
