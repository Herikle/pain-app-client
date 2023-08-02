import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";
import { ISegment, ITrack } from "types";
import update from "immutability-helper";
import { GetTracksListResponse } from "@queries/track/useGetTrack";

type UpdateSegmentOnCache = {
  segment: ISegment;
  episode_id: string;
};

export const useUpdateSegmentOnCache = () => {
  const queryClient = useQueryClient();

  const updateSegmentOnCache = async (values: UpdateSegmentOnCache) => {
    const { segment, episode_id } = values;

    queryClient.setQueriesData(
      [QueryKeys.Track.List, { episode_id }],
      (old: GetTracksListResponse) => {
        const track_id = segment.track_id;

        const trackIndex = old.results.findIndex(
          (track: ITrack) => track._id === track_id
        );
        if (trackIndex >= 0) {
          const track = old.results[trackIndex];
          if (track?.segments) {
            const segmentIndex = track.segments.findIndex(
              (seg: ISegment) => seg._id === segment._id
            );
            if (segmentIndex >= 0) {
              const newResults = update(old, {
                results: {
                  [trackIndex]: {
                    segments: {
                      [segmentIndex]: {
                        $set: segment,
                      },
                    },
                  },
                },
              });

              return newResults;
            }
          }
        }

        return old;
      }
    );
  };

  return { updateSegmentOnCache };
};
