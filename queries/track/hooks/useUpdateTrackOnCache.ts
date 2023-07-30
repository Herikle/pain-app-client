import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";
import { ISegment, ITrack } from "types";
import update from "immutability-helper";
import { GetTracksListResponse } from "@queries/track/useGetTrack";

type UpdateTrackOnCache = {
  track: ITrack;
};

export const useUpdateTrackOnCache = () => {
  const queryClient = useQueryClient();

  const updateTrackOnCache = async (values: UpdateTrackOnCache) => {
    const { track } = values;

    const episode_id = track.episode_id;

    queryClient.setQueriesData(
      [QueryKeys.Track.List, { episode_id }],
      (old: GetTracksListResponse) => {
        const track_id = track._id;

        const trackIndex = old.results.findIndex(
          (track: ITrack) => track._id === track_id
        );
        if (trackIndex >= 0) {
          const newResults = update(old, {
            results: {
              [trackIndex]: {
                $merge: track,
              },
            },
          });

          return newResults;
        }

        return old;
      }
    );
  };

  const addTrackOnCache = async (values: UpdateTrackOnCache) => {
    const { track } = values;

    const episode_id = track.episode_id;

    queryClient.setQueriesData(
      [QueryKeys.Track.List, { episode_id }],
      (old: GetTracksListResponse) => {
        const newResults = update(old, {
          results: {
            $push: [track],
          },
        });

        return newResults;
      }
    );
  };

  const remoteTrackOnCache = async (values: UpdateTrackOnCache) => {
    const { track } = values;

    const episode_id = track.episode_id;

    queryClient.setQueriesData(
      [QueryKeys.Track.List, { episode_id }],
      (old: GetTracksListResponse) => {
        const track_id = track._id;

        const trackIndex = old.results.findIndex(
          (track: ITrack) => track._id === track_id
        );
        if (trackIndex >= 0) {
          const newResults = update(old, {
            results: {
              $splice: [[trackIndex, 1]],
            },
          });

          return newResults;
        }

        return old;
      }
    );
  };

  return { updateTrackOnCache, addTrackOnCache, remoteTrackOnCache };
};
