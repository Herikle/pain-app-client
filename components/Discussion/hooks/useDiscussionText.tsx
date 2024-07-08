import { ConfirmActionModal } from "@Modals/ConfirmActionModal";
import { RichTextEditorJson } from "@components/RichText";
import {
  useDeleteDiscussion,
  useUpdateDiscussion,
} from "@queries/discussion/useDiscussion";
import { EditorState } from "lexical";
import { useEffect, useState } from "react";

type ReplyItem = {
  _id: string;
  text: RichTextEditorJson | null;
  deletedAt: string | null;
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  parent_id: string | null;
};

type Props = {
  discussion: ReplyItem | undefined;
  container?: Element | null;
};

export const useDiscussionText = ({ discussion }: Props) => {
  const [isOnEdit, setIsOnEdit] = useState(false);

  const [isOnDelete, setIsOnDelete] = useState(false);

  const [resetingRich, setResetingRich] = useState(false);

  const [textContent, setTextContent] = useState<RichTextEditorJson | null>(
    discussion?.text ?? null
  );

  useEffect(() => {
    setTextContent(discussion?.text ?? null);
  }, [discussion?.text]);

  const updateComment = useUpdateDiscussion();

  const deleteComment = useDeleteDiscussion();

  const readyToEdit = () => {
    setResetingRich(true);
    setTimeout(() => {
      setIsOnEdit(true);
      setResetingRich(false);
    }, 100);
  };

  const closeEdit = () => {
    setIsOnEdit(false);
  };

  const readyToDelete = () => {
    setIsOnDelete(true);
  };

  const updateTextContent = (state: EditorState) => {
    setTextContent(state.toJSON());
  };

  const onSave = async () => {
    if (!discussion) return;
    if (!textContent) return;

    await updateComment.mutateAsync({
      params: {
        discussion_id: discussion._id,
      },
      body: {
        text: textContent,
      },
      helper: {
        patient_id: discussion.patient_id,
        episode_id: discussion.episode_id,
        track_id: discussion.track_id,
        segment_id: discussion.segment_id,
        parent_id: discussion.parent_id,
      },
    });

    setIsOnEdit(false);
  };

  const onDelete = async () => {
    if (!discussion) return;

    await deleteComment.mutateAsync({
      params: {
        discussion_id: discussion._id,
      },
      helper: {
        patient_id: discussion.patient_id,
        episode_id: discussion.episode_id,
        track_id: discussion.track_id,
        segment_id: discussion.segment_id,
        parent_id: discussion.parent_id,
      },
    });

    setTextContent(null);

    setIsOnDelete(false);
  };

  const isDeleted = !!discussion?.deletedAt;

  const isNotDeleted = !isDeleted;

  return {
    isOnEdit,
    resetingRich,
    onSave,
    isDeleted,
    isNotDeleted,
    readyToEdit,
    readyToDelete,
    closeEdit,
    updateTextContent,
    updateIsLoading: updateComment.isLoading,
    textContent,
    render: (
      <>
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
      </>
    ),
  };
};
