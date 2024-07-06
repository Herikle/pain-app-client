import { RichTextEditorJson } from "@components/RichText";
import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useMutation, useQueryClient } from "react-query";
import { useUpdateDiscussionOnCache } from "./hooks/useUpdateDiscussionOnCache";
import { DiscussionUpdated } from "types/discussion";

type CreateDiscussionPayload = {
  text: RichTextEditorJson;
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  title?: string;
  parent_id?: string;
};

const createDiscussion = async (payload: CreateDiscussionPayload) => {
  const { data } = await request({
    service: "discussion",
    url: "",
    method: "POST",
    data: payload,
  });

  return data;
};

export const useCreateDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation(createDiscussion, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Discussion.List]);
    },
  });
};

type UpdateDiscussionPayload = {
  params: {
    discussion_id: string;
  };
  body: {
    text: RichTextEditorJson;
  };
  helper: {
    patient_id: string;
    episode_id: string | null;
    track_id: string | null;
    segment_id: string | null;
    parent_id: string | null;
  };
};

const updateDiscussion = async (payload: UpdateDiscussionPayload) => {
  const { data } = await request({
    service: "discussion",
    url: `/${payload.params.discussion_id}`,
    method: "PATCH",
    data: payload.body,
  });

  return data as DiscussionUpdated;
};

export const useUpdateDiscussion = () => {
  const queryClient = useQueryClient();

  const { updateDiscussionText } = useUpdateDiscussionOnCache();

  return useMutation(updateDiscussion, {
    onSuccess: (updated) => {
      updateDiscussionText({
        id: updated._id,
        discussion: updated,
        params: {
          patient_id: updated.patient_id,
          episode_id: updated.episode_id,
          track_id: updated.track_id,
          segment_id: updated.segment_id,
          parent_id: updated.parent_id,
        },
      });
      queryClient.invalidateQueries([QueryKeys.Discussion.List]);
    },
  });
};

type DeleteDiscussionPayload = {
  params: {
    discussion_id: string;
  };
  helper: {
    patient_id: string;
    episode_id: string | null;
    track_id: string | null;
    segment_id: string | null;
    parent_id: string | null;
  };
};

const deleteDiscussion = async (payload: DeleteDiscussionPayload) => {
  const { data } = await request({
    service: "discussion",
    url: `/${payload.params.discussion_id}`,
    method: "DELETE",
  });

  return data as DiscussionUpdated;
};

export const useDeleteDiscussion = () => {
  const queryClient = useQueryClient();

  const { updateDiscussionText } = useUpdateDiscussionOnCache();

  return useMutation(deleteDiscussion, {
    onSuccess: (deleted) => {
      updateDiscussionText({
        id: deleted._id,
        discussion: deleted,
        params: {
          patient_id: deleted.patient_id,
          episode_id: deleted.episode_id,
          track_id: deleted.track_id,
          segment_id: deleted.segment_id,
          parent_id: deleted.parent_id,
        },
      });
      queryClient.invalidateQueries([QueryKeys.Discussion.List]);
    },
  });
};
