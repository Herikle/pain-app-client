import { createContext, useContext, useState } from "react";

export type DiscussionPages =
  | {
      path: "list";
    }
  | {
      path: "create";
    }
  | {
      path: "discussion";
      discussion_id: string;
    };

type DiscussionNavigation = {
  page: DiscussionPages;
  setPage: (page: DiscussionPages) => void;
  discussion_path: {
    episode_id: string | null;
    name: string;
    patient_id: string;
  };
};

const DiscussionNavigationContext = createContext<DiscussionNavigation>({
  page: { path: "list" },
  discussion_path: {
    episode_id: "",
    name: "",
    patient_id: "",
  },
  setPage: () => {},
});

export const useDiscussionNavigation = () =>
  useContext(DiscussionNavigationContext);

type DiscussionPageProviderProps = {
  children: React.ReactNode;
  discussion_path: {
    episode_id: string | null;
    name: string;
    patient_id: string;
  };
};

export const DiscussionNavigationProvider = ({
  children,
  discussion_path,
}: DiscussionPageProviderProps) => {
  const [page, setPage] = useState<DiscussionPages>({ path: "list" });

  return (
    <DiscussionNavigationContext.Provider
      value={{
        page,
        setPage,
        discussion_path,
      }}
    >
      {children}
    </DiscussionNavigationContext.Provider>
  );
};
