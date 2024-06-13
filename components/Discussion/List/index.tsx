import { FlexColumn } from "@design-components/Flex";
import { CommentDiscussion } from "./components/Comment";

type CommentDiscussionList = {
  _id: string;
};

export const CommentDiscussionList = ({ comments }) => {
  return (
    <FlexColumn>
      {comments.map((comment: CommentDiscussionList) => {
        return <CommentDiscussion key={comment._id} comment={comment} />;
      })}
    </FlexColumn>
  );
};
