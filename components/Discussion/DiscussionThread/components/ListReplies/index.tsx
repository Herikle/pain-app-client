import { FlexColumn } from "@design-components/Flex";
import { useGetDiscussionComments } from "@queries/discussion/useGetDiscussion";
import React, { useMemo } from "react";
import styled from "styled-components";
import { Reply } from "../Reply";
import { media } from "@styles/media-query";
import { theme } from "@styles/theme";

type Props = {
  episode_id: string;
  parent_id: string;
};

export const ListReplies = ({ episode_id, parent_id }: Props) => {
  const getReplies = useGetDiscussionComments({
    episode_id,
    parent_id,
    page: 0,
    limit: 100,
    patient_id: null,
    sortBy: "-createdAt",
  });

  const replies = useMemo(
    () => getReplies.data?.results || [],
    [getReplies.data]
  );

  return (
    <FlexColumn>
      <DiscussionsContainer gap={1}>
        {replies.map((reply) => {
          return <Reply key={reply._id} reply={reply} />;
        })}
      </DiscussionsContainer>
    </FlexColumn>
  );
};

const DiscussionsContainer = styled(FlexColumn)``;
