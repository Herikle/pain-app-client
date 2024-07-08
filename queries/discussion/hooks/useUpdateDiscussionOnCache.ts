import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";

import { IEpisode } from "types";
import update from "immutability-helper";
import { RichTextEditorJson } from "@components/RichText";
import { GetDiscussionCommentsResponse } from "../useGetDiscussion";
import { DiscussionById, DiscussionFromList } from "types/discussion";

type DeleteEpisodeOnCache = {
  id: string;
};

type UpdateDiscussionTextProps = {
  id: string;
  discussion: Partial<DiscussionFromList>;
  params: {
    patient_id: string;
    episode_id: string | null;
    track_id: string | null;
    segment_id: string | null;
    parent_id: string | null;
  };
};

export const useUpdateDiscussionOnCache = () => {
  const queryClient = useQueryClient();

  // const deleteEpisodeOnCache = async (values: DeleteEpisodeOnCache) => {
  //   const { id } = values;

  //   queryClient.setQueriesData(
  //     [QueryKeys.Episode.List],
  //     (old: GetEpisodesListResponse) => {
  //       if (!old) return old;

  //       const episodeIndex = old.results.findIndex(
  //         (episode: IEpisode) => episode._id === id
  //       );
  //       if (episodeIndex > -1) {
  //         const newResults = update(old, {
  //           results: {
  //             $splice: [[episodeIndex, 1]],
  //           },
  //         });

  //         return newResults;
  //       }

  //       return old;
  //     }
  //   );
  // };

  // const updateEpisodeByIdOnCache = async (
  //   id: string,
  //   values: Partial<Discussion>
  // ) => {
  //   queryClient.setQueryData(
  //     [QueryKeys.Episode.ByID, { episode_id: id }],
  //     (old: GetEpisodeByIdResponse) => {
  //       if (!old) return old;

  //       return {
  //         ...old,
  //         ...values,
  //       };
  //     }
  //   );
  // };

  const updateDiscussionText = async ({
    id,
    params,
    discussion,
  }: UpdateDiscussionTextProps) => {
    queryClient.setQueriesData(
      [QueryKeys.Discussion.List, params],
      (old: GetDiscussionCommentsResponse) => {
        if (!old) return old;

        const discussionIndex = old.results.findIndex(
          (discussion) => discussion._id === id
        );

        if (discussionIndex > -1) {
          const newResults = update(old, {
            results: {
              [discussionIndex]: {
                $merge: discussion,
              },
            },
          });

          return newResults;
        }

        return old;
      }
    );

    queryClient.setQueriesData(
      [QueryKeys.Discussion.ByID, id],
      (old: DiscussionById) => {
        if (!old) return old;

        return {
          ...old,
          ...discussion,
        };
      }
    );
  };

  const addRepliesCountToDiscussion = async (id: string | null | undefined) => {
    if (!id) return;

    queryClient.setQueriesData(
      [QueryKeys.Discussion.List],
      (old: GetDiscussionCommentsResponse) => {
        if (!old) return old;

        const discussionIndex = old.results.findIndex(
          (discussion) => discussion._id === id
        );

        if (discussionIndex > -1) {
          const currentCount = old.results[discussionIndex].replies_count ?? 0;

          const newResults = update(old, {
            results: {
              [discussionIndex]: {
                replies_count: {
                  $set: currentCount + 1,
                },
              },
            },
          });

          return newResults;
        }

        return old;
      }
    );
  };

  return { updateDiscussionText, addRepliesCountToDiscussion };
};
