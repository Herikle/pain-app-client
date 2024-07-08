import { RichTextEditorJson } from "@components/RichText";

export type DiscussionFromList = {
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  parent_id: string | null;
  path: string;
  text: RichTextEditorJson | null;
  title: string;
  user_id: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
  replies_count: number;
  createdAt: string;
  updatedAt: string;
  edited: boolean;
  deletedAt: string | null;
};

export type DiscussionById = {
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  parent_id: string | null;
  path: string;
  text: RichTextEditorJson | null;
  title: string;
  user_id: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
  replies_count: number;
  createdAt: string;
  updatedAt: string;
  edited: boolean;
  deletedAt: string | null;
};

export type DiscussionUpdated = {
  createdAt: string;
  deletedAt: string | null;
  edited: boolean;
  episode_id: string | null;
  id: string;
  parent_id: string | null;
  path: string;
  patient_id: string;
  segment_id: string | null;
  text: RichTextEditorJson | null;
  track_id: string | null;
  updatedAt: string;
  user_id: string;
  _id: string;
};
