import { AddButton } from "@components/AddButton";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { IconsPath } from "@utils/icons";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { CreateSymptom, SymptomModal } from "./components/SymptomModal";
import { v4 as uuidv4 } from "uuid";
import { ISymptom } from "types";
import { SymptomCard } from "./components/SymptomCard";
import { ConfirmActionModal } from "@components/Modals/ConfirmActionModal";

const fakeDate = new Date().toISOString();

export const SymptomsPage = () => {
  const [symptoms, setSymptoms] = useState<ISymptom[]>([
    {
      _id: "1",
      name: "Swelling",
      datetime: "2023-07-15T21:49",
      createdAt: fakeDate,
      updatedAt: fakeDate,
    },
    {
      _id: "2",
      name: "Headache",
      datetime: "2023-07-15T21:49",
      createdAt: fakeDate,
      updatedAt: fakeDate,
    },
  ]);

  const [selected, setSelected] = useState<ISymptom | null>(null);

  const [toDelete, setToDelete] = useState<ISymptom | null>(null);

  const [toEdit, setToEdit] = useState<ISymptom | null>(null);

  const [addInterventionModalOpen, setAddInterventionModalOpen] =
    useState(false);

  const openAddModal = () => {
    setAddInterventionModalOpen(true);
  };

  const closeAddModal = () => {
    setAddInterventionModalOpen(false);
  };

  const onAddIntervention = (symptom: CreateSymptom) => {
    setSymptoms((prev) => [
      ...prev,
      { ...symptom, _id: uuidv4(), createdAt: fakeDate, updatedAt: fakeDate },
    ]);
  };

  const deleteById = (id: string) => {
    setSymptoms((prev) => prev.filter((i) => i._id !== id));
  };

  const edit = (symptom: CreateSymptom) => {
    if (toEdit) {
      const _id = toEdit._id;
      const index = symptoms.findIndex((i) => i._id === _id);
      const newSymptoms = [...symptoms];
      newSymptoms[index] = {
        ...symptom,
        _id,
        createdAt: fakeDate,
        updatedAt: fakeDate,
      };
      setSymptoms(newSymptoms);
    }
  };

  return (
    <>
      <Container align="flex-start" gap={4}>
        <ListIntervention>
          <AddTitle justify="space-between">
            <FlexRow>
              <Image
                src={IconsPath.Symptom}
                width={32}
                height={32}
                alt="Intervention Icon"
              />
              <Text variant="body2Bold">Symptom</Text>
            </FlexRow>
            <AddButton onClick={openAddModal} />
          </AddTitle>
          <FlexColumn mt={1}>
            {symptoms.map((symptom) => (
              <SymptomCard
                key={symptom._id}
                onClick={() => setSelected(symptom)}
                onClickDelete={() => setToDelete(symptom)}
                isActive={selected?._id === symptom._id}
                onClickEdit={() => setToEdit(symptom)}
                symptom={symptom}
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
        <SymptomModal
          open={addInterventionModalOpen}
          onClose={closeAddModal}
          onAdd={onAddIntervention}
        />
        {!!toEdit && (
          <SymptomModal
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
