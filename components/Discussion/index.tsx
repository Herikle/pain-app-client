import { useGetDiscussionComments } from "@queries/discussion/useGetDiscussion";
import { CommentDiscussionList } from "./List";
import { useContext, useMemo } from "react";
import { NewDiscussionCta } from "./List/components/NewDiscussionCta";
import { FlexColumn } from "@design-components/Flex";
import {
  DiscussionNavigationProvider,
  DiscussionPages,
  useDiscussionNavigation,
} from "./Context/pages";
import { CreateDiscussion } from "./Create";
import { DiscussionThread } from "./DiscussionThread";

type DiscussionProps = {
  discussion_path: {
    name: string;
    patient_id: string;
    episode_id: string | null;
    track_id: string | null;
    segment_id: string | null;
  };
};

const DiscussionNavigationPages: {
  [key in DiscussionPages["path"]]: () => JSX.Element;
} = {
  list: CommentDiscussionList,
  create: CreateDiscussion,
  discussion: DiscussionThread,
};

const DiscussionChild = () => {
  const { page } = useDiscussionNavigation();

  const Page = useMemo(() => {
    const path = page.path;
    return DiscussionNavigationPages[path];
  }, [page]);

  return (
    <FlexColumn height="100%">
      <Page />
    </FlexColumn>
  );
};

export const Discussion = ({ discussion_path }: DiscussionProps) => {
  return (
    <DiscussionNavigationProvider discussion_path={discussion_path}>
      <DiscussionChild />
    </DiscussionNavigationProvider>
  );
};
