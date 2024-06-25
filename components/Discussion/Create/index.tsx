import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { useCreateDiscussion } from "@queries/discussion/useDiscussion";
import { Button } from "@components/Button";
import { TextField } from "@components/TextField";
import { useForm, z, zodResolver } from "utils/helpers/form-validation";
import { useDiscussionNavigation } from "../Context/pages";
import { Text } from "@components/Text";

const discussionSchema = z.object({
  text: z.string().min(1, "Text is required"),
  title: z.string().min(1, "Title is required"),
});

type DiscussionForm = z.infer<typeof discussionSchema>;

export const CreateDiscussion = () => {
  const { discussion_path, setPage } = useDiscussionNavigation();

  const { register, handleSubmit, formState, reset } = useForm<DiscussionForm>({
    resolver: zodResolver(discussionSchema),
  });

  const { errors } = formState;

  const createCommentMutation = useCreateDiscussion();

  const createDiscussion = async (form: DiscussionForm) => {
    await createCommentMutation.mutateAsync({
      title: form.title,
      text: form.text,
      patient_id: discussion_path.patient_id,
      episode_id: discussion_path.episode_id,
      track_id: discussion_path.track_id,
      segment_id: discussion_path.segment_id,
    });

    setPage({
      path: "list",
    });

    reset();
  };

  return (
    <FlexColumn mt={3}>
      <Text variant="h2">Start a discussion</Text>
      <form onSubmit={handleSubmit(createDiscussion)} style={{ width: "100%" }}>
        <FlexColumn mt={2} gap={1.5}>
          <TextField
            label="Title*"
            {...register("title")}
            error={errors.title?.message}
            autoFocus
          />
          <TextArea
            minRows={5}
            label="Text*"
            {...register("text")}
            error={errors.text?.message}
          />
          <FlexRow justify="flex-end">
            <Button
              variant="text"
              textColor="pure_black"
              color="pure_white"
              onClick={() => {
                setPage({
                  path: "list",
                });
              }}
              disabled={createCommentMutation.isLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              loading={createCommentMutation.isLoading}
            >
              Start
            </Button>
          </FlexRow>
        </FlexColumn>
      </form>
    </FlexColumn>
  );
};
