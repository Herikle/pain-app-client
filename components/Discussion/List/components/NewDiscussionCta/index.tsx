import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";

type Props = {
  onCreateDiscussionClick: () => void;
};

export const NewDiscussionCta = ({ onCreateDiscussionClick }: Props) => {
  return (
    <FlexColumn>
      <Text variant="body2">Be the first to start a discussion</Text>
      <Button
        variant="text"
        onClick={onCreateDiscussionClick}
        color="pure_white"
        textColor="pure_black"
      >
        Start a discussion
      </Button>
    </FlexColumn>
  );
};
