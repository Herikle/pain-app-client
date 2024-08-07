import { FlexColumn, FlexRow } from "@design-components/Flex";
import { useGetDiscussionComments } from "@queries/discussion/useGetDiscussion";
import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { Reply } from "../Reply";
import DrinkCoffeSvg from "public/assets/drink-coffe.svg";
import { LoadingWrapper } from "@components/LoadingWrapper";
import { Text } from "@components/Text";

type Props = {
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  parent_id: string;
  parentIsDeleted: boolean;
  container?: Element | null;
  compactSpacing?: boolean;
  noCta?: boolean;
};

export const ListReplies = ({
  episode_id,
  parent_id,
  patient_id,
  track_id,
  segment_id,
  container,
  parentIsDeleted,
  compactSpacing,
  noCta,
}: Props) => {
  const getReplies = useGetDiscussionComments({
    episode_id,
    parent_id,
    page: 0,
    limit: 100,
    patient_id: patient_id,
    track_id,
    segment_id,
    sortBy: "-createdAt",
  });

  const replies = useMemo(
    () => getReplies.data?.results || [],
    [getReplies.data]
  );

  const isEmpty = replies.length === 0 && getReplies.isFetched;

  return (
    <FlexColumn gap={compactSpacing ? 0 : undefined}>
      <LoadingWrapper loading={getReplies.isLoading}>
        {!noCta && isEmpty && !parentIsDeleted ? (
          <EmptyDiscussionContainer justify="center" mt={2}>
            <DrinkCoffeSvg />
            <FlexColumn gap={1}>
              <Text variant="h3" color="pure_black">
                Be the first to start a discussion
              </Text>
              <Text variant="body2" color="pure_black">
                No one has replied to this post yet.
                <br />
                Share your opinion to start the discussion.
              </Text>
            </FlexColumn>
          </EmptyDiscussionContainer>
        ) : (
          <DiscussionsContainer gap={1}>
            {replies.map((reply) => {
              return (
                <Reply
                  key={reply._id}
                  reply={reply}
                  container={container}
                  compactSpacing={compactSpacing}
                />
              );
            })}
          </DiscussionsContainer>
        )}
      </LoadingWrapper>
    </FlexColumn>
  );
};

const BounceAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const EmptyDiscussionContainer = styled(FlexRow)`
  svg {
    width: 100px;
    height: 100px;

    #coffe-cup {
      animation: ${BounceAnimation} 2s ease-in-out infinite;
    }

    #hand {
      animation: ${BounceAnimation} 3s ease-in-out infinite;
    }
  }
`;

const DiscussionsContainer = styled(FlexColumn)``;
