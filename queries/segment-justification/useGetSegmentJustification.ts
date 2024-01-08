import { useReactQueryCache } from "@queries/getByIdFromCache";
import { QueryKeys } from "@queries/keys";
import { RequestService, request } from "@queries/request";
import { hasToken } from "@utils/localStorage/token";
import { useQuery } from "react-query";
import { ISegmentJustification } from "types";

export const getSegmentJustificationService = (): RequestService => {
  return hasToken() ? "segment-justification" : "segment-justification-guest";
};

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
    service: getSegmentJustificationService(),
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
