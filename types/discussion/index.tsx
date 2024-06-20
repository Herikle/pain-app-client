export type DiscussionFromList = {
  episode_id: string | null;
  parent_id: string | null;
  path: string;
  text: string;
  title: string;
  user_id: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type DiscussionById = {
  episode_id: string | null;
  parent_id: string | null;
  path: string;
  text: string;
  title: string;
  user_id: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
};
