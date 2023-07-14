import { AddButton } from "@components/AddButton";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { IconsPath } from "@utils/icons";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import {
  CreateIntervention,
  InterventionModal,
} from "./components/InterventionModal";
import { v4 as uuidv4 } from "uuid";
import { IIntervetion } from "types";
import { InterventionCard } from "./components/InterventionCard";

export const InterventionPage = () => {
  const [interventions, setInterventions] = useState<IIntervetion[]>([
    {
      _id: "1",
      name: "Paracetamol",
      datetime: "2023-07-15T21:49",
      dose: "1 comprimido",
      effective: true,
    },
    {
      _id: "2",
      name: "Anesthesia",
      datetime: "2023-07-15T21:49",
      dose: "1 gota",
      effective: false,
    },
  ]);

  const [addInterventionModalOpen, setAddInterventionModalOpen] =
    useState(false);

  const openAddModal = () => {
    setAddInterventionModalOpen(true);
  };

  const closeAddModal = () => {
    setAddInterventionModalOpen(false);
  };

  const onAddIntervention = (intervention: CreateIntervention) => {
    setInterventions((prev) => [...prev, { ...intervention, _id: uuidv4() }]);
  };

  return (
    <Container align="flex-start" gap={4}>
      <ListIntervention>
        <AddTitle justify="space-between">
          <FlexRow>
            <Image
              src={IconsPath.Invervention}
              width={32}
              height={32}
              alt="Intervention Icon"
            />
            <Text variant="body2Bold">Intervention</Text>
          </FlexRow>
          <AddButton onClick={openAddModal} />
        </AddTitle>
        <FlexColumn>
          {interventions.map((intervention) => (
            <InterventionCard
              key={intervention._id}
              intervention={intervention}
            />
          ))}
        </FlexColumn>
      </ListIntervention>
      <Observation>
        <TextArea
          label="Observation about 'Pracetamol'"
          minRows={15}
          maxRows={15}
        />
      </Observation>
      <InterventionModal
        open={addInterventionModalOpen}
        onClose={closeAddModal}
        onAdd={onAddIntervention}
      />
    </Container>
  );
};

const AddTitle = styled(FlexRow)`
  width: 100%;
`;

const Observation = styled(FlexColumn)`
  width: 50%;
`;

const ListIntervention = styled(FlexColumn)`
  width: 50%;
`;

const Container = styled(FlexRow)``;
