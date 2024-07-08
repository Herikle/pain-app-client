import { RichText, RichTextEditorJson } from "@components/RichText";
import { useCreateDiscussion } from "@queries/discussion/useDiscussion";
import { useState } from "react";

type Props = {
  patient_id: string;
  parent_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  onCancel: () => void;
};

export const ReplyAction = ({
  parent_id,
  patient_id,
  episode_id,
  segment_id,
  track_id,
  onCancel,
}: Props) => {
  const [text, setText] = useState<RichTextEditorJson | null>(null);

  const createDiscussion = useCreateDiscussion();

  const handleCreateDiscussion = async () => {
    if (!text) return;

    await createDiscussion.mutateAsync({
      text,
      patient_id,
      episode_id,
      track_id,
      segment_id,
      parent_id,
    });

    onCancel();
  };

  return (
    <RichText
      mode="prepare"
      onCancel={onCancel}
      defaultEnabled
      autoFocus
      onChange={(state) => setText(state.toJSON())}
      options={{
        clearOnSubmit: true,
      }}
      onSubmit={handleCreateDiscussion}
    />
  );
};
