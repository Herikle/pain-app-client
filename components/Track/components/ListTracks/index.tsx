import { Track } from "@components/Track";
import { useGetTracksList } from "@queries/track/useGetTrack";
import { useMemo } from "react";

type ListTrackProps = {
  episode_id: string;
};

export const ListTrack = ({ episode_id }: ListTrackProps) => {
  const getTracks = useGetTracksList({ episode_id, limit: 100, page: 0 });

  const tracks = useMemo(() => getTracks.data?.results, [getTracks.data]);

  return (
    <>
      {tracks?.map((track) => (
        <Track key={track._id} track={track} />
      ))}
    </>
  );
};
