import { ConfirmActionModal } from "@Modals/ConfirmActionModal";
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
import styled from "styled-components";

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
};

type Props = {
  reply: ReplyItem;
  container?: Element | null;
};

export const Reply = ({ reply, container }: Props) => {
  const { user } = useAuth();

  const [openDots, setOpenDots] = useState(false);

  const [isOnEdit, setIsOnEdit] = useState(false);

  const [isOnDelete, setIsOnDelete] = useState(false);

  const [resetingRich, setResetingRich] = useState(false);

  const [textContent, setTextContent] = useState<RichTextEditorJson | null>(
    reply.text
  );

  const dotsRef = useRef<HTMLDivElement | null>(null);

  const updateComment = useUpdateDiscussion();

  const deleteComment = useDeleteDiscussion();

  const readyToEdit = () => {
    setResetingRich(true);
    setTimeout(() => {
      setIsOnEdit(true);
      setResetingRich(false);
    }, 100);
  };

  const onSave = async () => {
    if (!textContent) return;

    await updateComment.mutateAsync({
      params: {
        discussion_id: reply._id,
      },
      body: {
        text: textContent,
      },
      helper: {
        patient_id: reply.patient_id,
        episode_id: reply.episode_id,
        track_id: reply.track_id,
        segment_id: reply.segment_id,
        parent_id: reply.parent_id,
      },
    });

    setIsOnEdit(false);
  };

  const onDelete = async () => {
    await deleteComment.mutateAsync({
      params: {
        discussion_id: reply._id,
      },
      helper: {
        patient_id: reply.patient_id,
        episode_id: reply.episode_id,
        track_id: reply.track_id,
        segment_id: reply.segment_id,
        parent_id: reply.parent_id,
      },
    });

    setTextContent(null);

    setIsOnDelete(false);
  };

  const isDeleted = !!reply.deletedAt;

  const isNotDeleted = !isDeleted;

  return (
    <Container align="flex-start" gap={0.5}>
      {isNotDeleted ? (
        <FlexRow>
          <Text variant="caption">
            <strong>{reply.user.name}</strong> •{" "}
            {formatDistanceToNow(new Date(reply.createdAt))}
            {reply.edited && (
              <>
                {" "}
                • {"(Edited)"} {formatDistanceToNow(new Date(reply.updatedAt))}.
              </>
            )}
          </Text>
        </FlexRow>
      ) : (
        <FlexRow>
          <Text variant="caption">
            <strong>Comment deleted by user</strong> •{" "}
            {formatDistanceToNow(new Date(reply.createdAt))}
          </Text>
        </FlexRow>
      )}
      <Text variant="h3">{reply.title}</Text>
      {textContent && (
        <>
          {resetingRich ? (
            <FakeRich />
          ) : (
            <RichText
              initialValue={textContent}
              onChange={(state) => setTextContent(state.toJSON())}
              readOnly={!isOnEdit}
              mode={isOnEdit ? "prepare" : undefined}
              onCancel={() => setIsOnEdit(false)}
              onSubmit={onSave}
              defaultEnabled={isOnEdit}
              autoFocus={isOnEdit}
              loading={updateComment.isLoading}
              buttonText="Save"
            />
          )}
        </>
      )}
      <ActionFooter gap={1}>
        {isNotDeleted && (
          <FooterItem gap={0.25}>
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
                  onClick: () => setIsOnDelete(true),
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
      {isOnDelete && (
        <ConfirmActionModal
          title="Delete Comment"
          description="Are you sure you want to delete this comment?"
          onClose={() => setIsOnDelete(false)}
          onConfirm={onDelete}
          loading={deleteComment.isLoading}
          confirmText="Delete"
          cancelText="Cancel"
        />
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

const Container = styled(FlexColumn)`
  padding: 1rem;
  transition: background-color 0.2s;
  border-radius: 4px;
`;
