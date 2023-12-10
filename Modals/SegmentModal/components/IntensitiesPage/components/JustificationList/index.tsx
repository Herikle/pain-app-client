import { AddButton } from "@components/AddButton";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { useState } from "react";
import { ISegmentJustification } from "types";
import { v4 as uuidv4 } from "uuid";
import { Justification } from "./components/Justification";

export const JustificationList = () => {
  const [justifications, setJustifications] = useState<ISegmentJustification[]>(
    []
  );

  const addJustification = () => {
    const newJustification: ISegmentJustification = {
      _id: uuidv4(),
      title: `New justification ${justifications.length + 1}`,
      type_of_evidence: "",
      description: "",
      sources: "",
      ranking: {
        excruciating: 0,
        disabling: 0,
        hurful: 0,
        annoying: 0,
        no_pain: 0,
      },
    };

    setJustifications([...justifications, newJustification]);
  };

  return (
    <FlexColumn width="100%" align="flex-start">
      <FlexRow justify="space-between" width="100%">
        <Text variant="h3">Justification</Text>
        <AddButton onClick={addJustification} />
      </FlexRow>
      <FlexColumn mt={1.5} gap={1.5}>
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
