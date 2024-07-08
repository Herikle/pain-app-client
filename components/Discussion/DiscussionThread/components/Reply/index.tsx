import { ConfirmActionModal } from "@Modals/ConfirmActionModal";
import { DiscussionHeader } from "@components/Discussion/components/Breadcrumbs/DiscussionHeader";
import { useDiscussionText } from "@components/Discussion/hooks/useDiscussionText";
import { FloatingMenu } from "@components/FloatingMenu";
import { RichText, RichTextEditorJson } from "@components/RichText";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import {
  Chat,
  DotsThree,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import {
  useDeleteDiscussion,
  useUpdateDiscussion,
} from "@queries/discussion/useDiscussion";
import { theme } from "@styles/theme";
import { useAuth } from "@utils/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReplyAction } from "./components/ReplyAction";
import { ListReplies } from "../ListReplies";

type ReplyItem = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  title: string;
  text: RichTextEditorJson | null;
  edited: boolean;
  deletedAt: string | null;
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  parent_id: string | null;
  replies_count: number;
};

type Props = {
  reply: ReplyItem;
  compactSpacing?: boolean;
  container?: Element | null;
};

export const Reply = ({ reply, compactSpacing, container }: Props) => {
  const { user } = useAuth();

  const [openDots, setOpenDots] = useState(false);

  const [onReply, setOnReply] = useState(false);

  const dotsRef = useRef<HTMLDivElement | null>(null);

  const {
    isNotDeleted,
    isOnEdit,
    onSave,
    render,
    resetingRich,
    readyToDelete,
    readyToEdit,
    closeEdit,
    updateTextContent,
    updateIsLoading,
    textContent,
  } = useDiscussionText({
    discussion: reply,
  });

  return (
    <Container align="flex-start" gap={0.5} $compactSpacing={compactSpacing}>
      <DiscussionHeader isNotDeleted={isNotDeleted} comment={reply} />
      <Text variant="h3">{reply.title}</Text>
      {textContent && (
        <>
          {resetingRich ? (
            <FakeRich />
          ) : (
            <RichText
              initialValue={textContent}
              onChange={updateTextContent}
              readOnly={!isOnEdit}
              mode={isOnEdit ? "prepare" : undefined}
              onCancel={closeEdit}
              onSubmit={onSave}
              defaultEnabled={isOnEdit}
              autoFocus={isOnEdit}
              loading={updateIsLoading}
              buttonText="Save"
            />
          )}
        </>
      )}
      <ActionFooter gap={1}>
        {isNotDeleted && (
          <FooterItem gap={0.25} onClick={() => setOnReply(true)}>
            <Chat size={20} />
            <Text variant="caption" fontWeight="700">
              Reply
            </Text>
          </FooterItem>
        )}
        {reply.user._id === user?._id && isNotDeleted && (
          <>
            <FooterItem ref={dotsRef} onClick={() => setOpenDots(true)}>
              <DotsThree size={20} />
            </FooterItem>
            <FloatingMenu
              anchorEl={dotsRef.current}
              container={container}
              open={openDots}
              options={[
                {
                  id: "delete",
                  label: (
                    <FlexRow justify="flex-start">
                      <TrashSimple size={18} />
                      <Text variant="body2">Delete</Text>
                    </FlexRow>
                  ),
                  onClick: readyToDelete,
                },
                {
                  id: "edit",
                  label: (
                    <FlexRow justify="flex-start">
                      <PencilSimple size={18} />
                      <Text variant="body2">Edit</Text>
                    </FlexRow>
                  ),
                  onClick: readyToEdit,
                },
              ]}
              onClose={() => setOpenDots(false)}
            />
          </>
        )}
      </ActionFooter>
      {render}
      {onReply && (
        <ReplyAction
          parent_id={reply._id}
          patient_id={reply.patient_id}
          episode_id={reply.episode_id}
          track_id={reply.track_id}
          segment_id={reply.segment_id}
          onCancel={() => setOnReply(false)}
        />
      )}
      {reply.replies_count > 0 && (
        <FlexColumn
          mt={0.5}
          width="100%"
          style={{
            paddingLeft: "1rem",
          }}
        >
          <ListReplies
            noCta
            compactSpacing
            parent_id={reply._id}
            episode_id={reply.episode_id}
            patient_id={reply.patient_id}
            track_id={reply.track_id}
            segment_id={reply.segment_id}
            parentIsDeleted={!isNotDeleted}
            container={container}
          />
        </FlexColumn>
      )}
    </Container>
  );
};

const FakeRich = styled.div`
  width: 100%;
  height: 100px;

  border-radius: 8px;
  background-color: ${theme.colors.pastel};
`;

const FooterItem = styled(FlexRow)`
  cursor: pointer;
  padding-inline: 0.7rem;
  margin-inline-start: -0.7rem;
  padding-block: 0.25rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: ${theme.colors.hover_state};
  }
`;

const ActionFooter = styled(FlexRow)``;

type ContainerProps = {
  $compactSpacing?: boolean;
};

const Container = styled(FlexColumn)<ContainerProps>`
  padding: 1rem;
  transition: background-color 0.2s;
  border-radius: 4px;

  ${({ $compactSpacing }) =>
    $compactSpacing &&
    css`
      padding-block: 0;
    `}
`;
