type CommentDiscussion = {
  _id: string;
};

type Props = {
  comment: CommentDiscussion;
};

export const CommentDiscussion = ({ comment }: Props) => {
  return <>{comment._id}</>;
};
