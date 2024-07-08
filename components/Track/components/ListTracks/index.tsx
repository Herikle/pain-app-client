import { LoadingWrapper } from "@components/LoadingWrapper";
import { Track } from "@components/Track";
import { useGetTracksList } from "@queries/track/useGetTrack";
import { useMemo } from "react";

type ListTrackProps = {
  episode_id: string;
  patient_id: string | undefined;
  episode: {
    name: string;
  };
  patient?: {
    name: string;
  };
  isCreator?: boolean;
};

export const ListTrack = ({
  episode_id,
  patient_id,
  episode,
  patient,
  isCreator,
}: ListTrackProps) => {
  const getTracks = useGetTracksList({ episode_id, limit: 100, page: 0 });

  const tracks = useMemo(() => getTracks.data?.results, [getTracks.data]);

  return (
    <LoadingWrapper loading={getTracks.isLoading}>
      {tracks?.map((track) => (
        <Track
          key={track._id}
          track={{ ...track, patient_id, episode, patient }}
          isCreator={isCreator}
        />
      ))}
    </LoadingWrapper>
  );
};
