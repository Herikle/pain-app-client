import { useGetDiscussionComments } from "@queries/discussion/useGetDiscussion";
import { CommentDiscussionList } from "./List";
import { useMemo, useState } from "react";
import { NewDiscussionCta } from "./NewDiscussionCta";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { useCreateDiscussion } from "@queries/discussion/useDiscussion";
import { Button } from "@components/Button";

type DiscussionProps = {
  episode_id: string;
};

export const Discussion = ({ episode_id }: DiscussionProps) => {
  const [ctaRead, setCtaRead] = useState(false);

  const [textComment, setTextComment] = useState("");

  const onCreateDiscussionClick = () => {
    setCtaRead(true);
  };

  const getComments = useGetDiscussionComments({
    episode_id,
    patient_id: null,
    limit: 10,
    page: 1,
  });

  const comments = useMemo(
    () => getComments.data?.results || [],
    [getComments.data]
  );

  const isEmpty = comments.length === 0 && getComments.isFetched;

  const createCommentMutation = useCreateDiscussion();

  const createComment = async () => {
    await createCommentMutation.mutateAsync({
      episode_id,
      text: textComment,
    });

    setTextComment("");
  };

  return (
    <FlexColumn justify="space-between" height="100%">
      <FlexColumn justify="center" align="center" height="100%">
        <CommentDiscussionList comments={comments} />
        {isEmpty && !ctaRead && (
          <NewDiscussionCta onCreateDiscussionClick={onCreateDiscussionClick} />
        )}
      </FlexColumn>
      {!isEmpty ||
        (isEmpty && ctaRead && (
          <FlexColumn>
            <TextArea
              minRows={5}
              autoFocus
              value={textComment}
              onChange={(e) => setTextComment(e.target.value)}
            />
            <FlexRow justify="flex-end">
              <Button
                variant="text"
                textColor="pure_black"
                color="pure_white"
                onClick={() => setCtaRead(false)}
                disabled={createCommentMutation.isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                loading={createCommentMutation.isLoading}
                type="button"
                onClick={createComment}
              >
                Comment
              </Button>
            </FlexRow>
          </FlexColumn>
        ))}
    </FlexColumn>
  );
};
