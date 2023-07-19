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
import { ConfirmActionModal } from "@components/Modals/ConfirmActionModal";

export const InterventionPage = () => {
  const [interventions, setInterventions] = useState<IIntervetion[]>([
    {
      _id: "1",
      name: "Paracetamol",
      datetime: "2023-07-15T21:49",
      dose: "option-1",
      effective: true,
    },
    {
      _id: "2",
      name: "Anesthesia",
      datetime: "2023-07-15T21:49",
      dose: "option-2",
      effective: false,
    },
  ]);

  const [selected, setSelected] = useState<IIntervetion | null>(null);

  const [toDelete, setToDelete] = useState<IIntervetion | null>(null);

  const [toEdit, setToEdit] = useState<IIntervetion | null>(null);

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

  const deleteById = (id: string) => {
    setInterventions((prev) => prev.filter((i) => i._id !== id));
  };

  const edit = (intervention: CreateIntervention) => {
    if (toEdit) {
      const _id = toEdit._id;
      const index = interventions.findIndex((i) => i._id === _id);
      const newInterventions = [...interventions];
      newInterventions[index] = { ...intervention, _id };
      setInterventions(newInterventions);
    }
  };

  return (
    <>
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
          <FlexColumn mt={1}>
            {interventions.map((intervention) => (
              <InterventionCard
                key={intervention._id}
                onClick={() => setSelected(intervention)}
                onClickDelete={() => setToDelete(intervention)}
                onClickEdit={() => setToEdit(intervention)}
                isActive={selected?._id === intervention._id}
                intervention={intervention}
              />
            ))}
          </FlexColumn>
        </ListIntervention>
        <Observation>
          {!!selected && (
            <TextArea
              label={`Observation about '${selected.name}'`}
              placeholder="Write something..."
              minRows={15}
              maxRows={15}
            />
          )}
        </Observation>
        <InterventionModal
          open={addInterventionModalOpen}
          onClose={closeAddModal}
          onAdd={onAddIntervention}
        />
        {!!toEdit && (
          <InterventionModal
            open={!!toEdit}
            onClose={() => setToEdit(null)}
            onAdd={edit}
            defaultValues={toEdit}
          />
        )}
      </Container>
      {toDelete && (
        <ConfirmActionModal
          description={`Are you sure you want to delete '${toDelete.name}'?`}
          onClose={() => setToDelete(null)}
          onConfirm={() => {
            deleteById(toDelete._id);
            setToDelete(null);
          }}
        />
      )}
    </>
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
