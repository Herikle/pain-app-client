import { FlexColumn, FlexRow } from "@design-components/Flex";
import { CommentDiscussion } from "./components/CommentDiscussion";
import { useGetDiscussionComments } from "@queries/discussion/useGetDiscussion";
import React, { useMemo } from "react";
import { NewDiscussionCta } from "./components/NewDiscussionCta";
import { useDiscussionNavigation } from "../Context/pages";
import { AddButton } from "@components/AddButton";
import { Text } from "@components/Text";
import styled from "styled-components";
import { theme } from "@styles/theme";
import { media } from "@styles/media-query";

type CommentDiscussionList = {
  _id: string;
};

export const CommentDiscussionList = () => {
  const { episode, setPage } = useDiscussionNavigation();

  const getComments = useGetDiscussionComments({
    episode_id: episode._id,
    patient_id: null,
    limit: 100,
    page: 0,
    parent_id: null,
    sortBy: "-createdAt",
  });

  const comments = useMemo(
    () => getComments.data?.results || [],
    [getComments.data]
  );

  const isEmpty = comments.length === 0 && getComments.isFetched;

  return (
    <FlexColumn height="100%" gap={4}>
      <FlexColumn gap={2}>
        <Text variant="h2">{episode.name}</Text>
        <FlexRow
          justify="flex-start"
          onClick={() => setPage({ path: "create" })}
          style={{
            cursor: "pointer",
          }}
        >
          <AddButton />
          <Text variant="body2">Start a discussion</Text>
        </FlexRow>
      </FlexColumn>
      {isEmpty ? (
        <FlexColumn justify="center" align="center" height="100%">
          <NewDiscussionCta
            onCreateDiscussionClick={() => {
              setPage({
                path: "create",
              });
            }}
          />
        </FlexColumn>
      ) : (
        <FlexColumn>
          <Separator style={{ marginBottom: "1rem" }} />
          <DiscussionsContainer gap={0.15}>
            {comments.map((comment, index) => {
              return (
                <React.Fragment key={comment._id}>
                  <CommentDiscussion comment={comment} />
                  {index !== comments.length - 1 && (
                    <Separator
                      style={{
                        width: "90%",
                        margin: "auto",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </DiscussionsContainer>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

const DiscussionsContainer = styled(FlexColumn)`
  height: 400px;
  overflow-y: auto;

  ${media.up.laptopL`
    height: 350px;  
  `}
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  min-height: 1px;
  background-color: ${theme.colors.light_grey};
`;
