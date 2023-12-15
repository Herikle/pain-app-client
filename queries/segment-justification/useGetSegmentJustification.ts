import { useReactQueryCache } from "@queries/getByIdFromCache";
import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useQuery } from "react-query";
import { ISegmentJustification, ITrack, Meta } from "types";

type GetSegmentJustificationListPayload = {
  params: {
    segment_id: string;
  };
};

const getSegmentJustificationList = async ({
  params,
}: GetSegmentJustificationListPayload) => {
  const { data } = await request({
    method: "GET",
    url: `${params.segment_id}`,
    service: "segment-justification",
  });

  return data as ISegmentJustification[];
};

export const useGetSegmentJustificationList = (
  params: GetSegmentJustificationListPayload["params"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.SegmentJustification.List, params],
    () => getSegmentJustificationList({ params }),
    {
      enabled,
      refetchOnWindowFocus: true,
    }
  );
};
