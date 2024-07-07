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
    <Container align="flex-start" gap={0.5}>
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
