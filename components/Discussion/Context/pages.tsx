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
  episode: {
    _id: string;
    name: string;
    patient_id: string;
  };
};

const DiscussionNavigationContext = createContext<DiscussionNavigation>({
  page: { path: "list" },
  episode: {
    _id: "",
    name: "",
    patient_id: "",
  },
  setPage: () => {},
});

export const useDiscussionNavigation = () =>
  useContext(DiscussionNavigationContext);

type DiscussionPageProviderProps = {
  children: React.ReactNode;
  episode: {
    _id: string;
    name: string;
    patient_id: string;
  };
};

export const DiscussionNavigationProvider = ({
  children,
  episode,
}: DiscussionPageProviderProps) => {
  const [page, setPage] = useState<DiscussionPages>({ path: "list" });

  return (
    <DiscussionNavigationContext.Provider
      value={{
        page,
        setPage,
        episode,
      }}
    >
      {children}
    </DiscussionNavigationContext.Provider>
  );
};
