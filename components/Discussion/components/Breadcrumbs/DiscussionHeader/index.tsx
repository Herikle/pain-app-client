import { Text } from "@components/Text";
import { FlexRow } from "@design-components/Flex";
import { formatDistanceToNow } from "date-fns";

type Props = {
  isNotDeleted: boolean;
  comment: {
    user: {
      name: string;
    };
    createdAt: string;
    updatedAt: string;
    edited: boolean;
  };
};

export const DiscussionHeader = ({ isNotDeleted, comment }: Props) => {
  return (
    <>
      {isNotDeleted ? (
        <FlexRow>
          <Text variant="caption">
            <strong>{comment.user.name}</strong> •{" "}
            {formatDistanceToNow(new Date(comment.createdAt))}
            {comment.edited && (
              <>
                {" "}
                • {"(Edited)"}{" "}
                {formatDistanceToNow(new Date(comment.updatedAt))}.
              </>
            )}
          </Text>
        </FlexRow>
      ) : (
        <FlexRow>
          <Text variant="caption">
            <strong>Discussion deleted by user</strong> •{" "}
            {formatDistanceToNow(new Date(comment.createdAt))}
          </Text>
        </FlexRow>
      )}
    </>
  );
};
