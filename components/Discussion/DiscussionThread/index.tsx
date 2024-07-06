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
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { BackButton } from "@components/BackButton";
import { useCreateDiscussion } from "@queries/discussion/useDiscussion";
import { TextArea } from "@components/TextArea";
import { Button } from "@components/Button";
import { ListReplies } from "./components/ListReplies";
import { media } from "@styles/media-query";
import { RichText, RichTextEditorJson } from "@components/RichText";

export const DiscussionThread = () => {
  const { page, setPage, discussion_path } = useDiscussionNavigation();

  const [text, setText] = useState<RichTextEditorJson | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement>(null);

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
    if (!text) return;
    await createCommentMutation.mutateAsync({
      episode_id: discussion_path.episode_id,
      text: text,
      parent_id: discussion_id,
      patient_id: discussion_path.patient_id,
      segment_id: discussion_path.segment_id,
      track_id: discussion_path.track_id,
    });
    setText(undefined);
  };

  return (
    <FlexColumn height="100%" ref={containerRef}>
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
                <FlexColumn mt={1.5} mb={1.5}>
                  {comment.text && (
                    <RichText initialValue={comment.text} readOnly />
                  )}
                </FlexColumn>
                <FlexRow>
                  <CounterContainer>
                    <Chat size={20} />
                    <Text variant="caption" fontWeight="700">
                      {comment.replies_count}
                    </Text>
                  </CounterContainer>
                </FlexRow>
              </Container>
            </>
          )}

          <AddCommentContainer align="flex-end">
            <RichText
              onChange={(editorState) => {
                setText(editorState.toJSON());
              }}
              placeholder="Add a comment"
              mode="prepare"
              onSubmit={createDiscussion}
              loading={createCommentMutation.isLoading}
              options={{
                clearOnSubmit: true,
              }}
              buttonText="Comment"
            />
          </AddCommentContainer>
          {!!discussionId && (
            <ListReplies
              episode_id={discussion_path.episode_id}
              parent_id={discussionId}
              patient_id={discussion_path.patient_id}
              segment_id={discussion_path.segment_id}
              track_id={discussion_path.track_id}
              container={containerRef.current}
            />
          )}
        </LoadingWrapper>
      </ThreadBody>
    </FlexColumn>
  );
};

const AddCommentContainer = styled(FlexColumn)`
  /* min-height: 8.5rem; */
`;

const CounterContainer = styled(FlexRow)`
  background-color: ${transparentize(0.7, theme.colors.secondary_color)};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const ThreadBody = styled(FlexColumn)`
  height: 100%;
  overflow-y: auto;

  ${media.up.laptopL`
    height: calc(100% - 100px);
  `}
`;

const Container = styled(FlexColumn)`
  padding: 1rem;
  transition: background-color 0.2s;
  border-radius: 4px;
`;
