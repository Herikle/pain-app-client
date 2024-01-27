import { AddButton } from "@components/AddButton";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { useMemo } from "react";
import { Justification } from "./components/Justification";
import { useGetSegmentJustificationList } from "@queries/segment-justification/useGetSegmentJustification";
import { useCreateSegmentJustification } from "@queries/segment-justification/useSegmentJustification";

type Props = {
  segment_id: string;
};

export const JustificationList = ({ segment_id }: Props) => {
  const getJustifications = useGetSegmentJustificationList({ segment_id });

  const createJustification = useCreateSegmentJustification();

  const justifications = useMemo(
    () => getJustifications.data ?? [],
    [getJustifications.data]
  );

  const addJustification = () => {
    createJustification.mutateAsync({
      params: {
        segment_id,
      },
    });
  };

  return (
    <FlexColumn width="100%" align="flex-start">
      <FlexRow justify="space-between" width="100%">
        <Text variant="h3">Evidence to justify probabilities</Text>
        <AddButton
          onClick={addJustification}
          loading={createJustification.isLoading}
        />
      </FlexRow>
      <FlexColumn mt={1.5} gap={1.5} width="100%">
        {justifications.map((justification) => (
          <Justification
            key={justification._id}
            justification={justification}
          />
        ))}
      </FlexColumn>
    </FlexColumn>
  );
};
