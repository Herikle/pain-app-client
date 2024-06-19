import { useGetDiscussionComments } from "@queries/discussion/useGetDiscussion";
import { CommentDiscussionList } from "./List";
import { useMemo, useState } from "react";
import { NewDiscussionCta } from "./NewDiscussionCta";
import { TextArea } from "@components/TextArea";
import { FlexColumn } from "@design-components/Flex";
import { useCreateDiscussion } from "@queries/discussion/useDiscussion";

type DiscussionProps = {
  episode_id: string;
};

export const Discussion = ({ episode_id }: DiscussionProps) => {
  const [ctaRead, setCtaRead] = useState(false);

  const onCreateDiscussionClick = () => {
    setCtaRead(true);
  };

  const getComments = useGetDiscussionComments({
    episode_id,
    limit: 10,
    page: 1,
  });

  const createComments = useCreateDiscussion();

  const comments = useMemo(
    () => getComments.data?.results || [],
    [getComments.data]
  );

  const isEmpty = comments.length === 0 && getComments.isFetched;

  return (
    <FlexColumn justify="center" align="center" height="100%">
      <CommentDiscussionList comments={comments} />
      {isEmpty && !ctaRead && (
        <NewDiscussionCta onCreateDiscussionClick={onCreateDiscussionClick} />
      )}
      {!isEmpty ||
        (isEmpty && ctaRead && (
          <>
            <TextArea minRows={5} />
          </>
        ))}
    </FlexColumn>
  );
};
