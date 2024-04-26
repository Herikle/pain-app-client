import { useState } from "react";
import styled from "styled-components";
import { ISymptom } from "types";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { AddButton } from "@components/AddButton";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { IconsPath } from "@utils/icons";
import { CreateSymptom, SymptomModal } from "./components/SymptomModal";
import { SymptomCard } from "./components/SymptomCard";
import { ConfirmActionModal } from "@Modals/ConfirmActionModal";
import { CommonSegmentModalProps } from "../..";
import update from "immutability-helper";
import { media } from "@styles/media-query";
import { LightScrollBar } from "@styles/theme";

const fakeDate = new Date().toISOString();

type Props = {
  symptoms: ISymptom[];
} & Omit<CommonSegmentModalProps<ISymptom[]>, "onValidChange">;

export const SymptomsPage = ({ symptoms, onChange }: Props) => {
  const [selected, setSelected] = useState<ISymptom | null>(null);

  const [toDelete, setToDelete] = useState<ISymptom | null>(null);

  const [toEdit, setToEdit] = useState<ISymptom | null>(null);

  const [addSymptomModalOpen, setAddSymptomModalOpen] = useState(false);

  const [observation, setObservation] = useState<string>("");

  const changeSelected = (symptom: ISymptom) => {
    setSelected(symptom);
    setObservation(symptom.observation ?? "");
  };

  const openAddModal = () => {
    setAddSymptomModalOpen(true);
  };

  const closeAddModal = () => {
    setAddSymptomModalOpen(false);
  };

  const onAddSymptom = (symptom: CreateSymptom) => {
    const newSymptom = {
      ...symptom,
      datetime: symptom.datetime?.toISOString(),
      _id: uuidv4(),
      createdAt: fakeDate,
      updatedAt: fakeDate,
    };

    const newSymptoms = update(symptoms, {
      $push: [newSymptom],
    });

    onChange(newSymptoms);
  };

  const deleteById = (id: string) => {
    const index = symptoms.findIndex((i) => i._id === id);
    const newSymptoms = update(symptoms, {
      $splice: [[index, 1]],
    });
    onChange(newSymptoms);
  };

  const edit = (symptom: CreateSymptom) => {
    if (toEdit) {
      const _id = toEdit._id;
      const index = symptoms.findIndex((i) => i._id === _id);

      const updatedSymptoms = update(symptoms, {
        [index]: {
          $merge: {
            ...symptom,
            datetime: symptom.datetime?.toISOString(),
          },
        },
      });

      onChange(updatedSymptoms);
    }
  };

  const onBlurObservation = () => {
    if (selected) {
      const index = symptoms.findIndex((i) => i._id === selected._id);

      const updatedSymptoms = update(symptoms, {
        [index]: {
          $merge: {
            observation,
          },
        },
      });

      onChange(updatedSymptoms);
    }
  };

  return (
    <>
      <Container data-cy="symptoms-page">
        <ListSymptom>
          <AddTitle justify="space-between">
            <FlexRow>
              <Image
                src={IconsPath.Symptom}
                width={32}
                height={32}
                alt="Symptom Icon"
              />
              <Text variant="body2Bold">Symptom</Text>
            </FlexRow>
            <AddButton onClick={openAddModal} />
          </AddTitle>
          <FlexColumn mt={1}>
            {symptoms.map((symptom) => (
              <SymptomCard
                key={symptom._id}
                onClick={() => changeSelected(symptom)}
                onClickDelete={() => setToDelete(symptom)}
                isActive={selected?._id === symptom._id}
                onClickEdit={() => setToEdit(symptom)}
                symptom={symptom}
              />
            ))}
          </FlexColumn>
        </ListSymptom>
        <Observation>
          {!!selected && (
            <TextArea
              label={`Observation about '${selected.name}'`}
              minRows={15}
              maxRows={15}
              onChange={(e) => setObservation(e.target.value)}
              value={observation}
              onBlur={onBlurObservation}
            />
          )}
        </Observation>
        <SymptomModal
          open={addSymptomModalOpen}
          onClose={closeAddModal}
          onAdd={onAddSymptom}
        />
        {!!toEdit && (
          <SymptomModal
            open={!!toEdit}
            onClose={() => setToEdit(null)}
            onAdd={edit}
            defaultValues={{
              ...toEdit,
              datetime: toEdit.datetime ? new Date(toEdit.datetime) : undefined,
            }}
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
  ${media.up.tablet`
    width: 100%;   
  `}
`;

const ListSymptom = styled(FlexColumn)`
  width: 50%;
  ${media.up.tablet`
    width: 100%;
    max-height: 40vh;
    overflow: auto;
    ${LightScrollBar};
    padding-right: 0.5rem;
  `}
`;

const Container = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;

  ${media.up.tablet`
    flex-direction: column;
  `}
`;
