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
import { ConfirmActionModal } from "Modals/ConfirmActionModal";
import { CommonSegmentModalProps } from "../..";
import update from "immutability-helper";
import { media } from "@styles/media-query";
import { LightScrollBar } from "@styles/theme";
import { ALL_DOSES, Doses } from "./const";
import { Select } from "@components/Select";

const fakeDate = new Date().toISOString();

type Props = {
  interventions: IIntervetion[];
} & Omit<CommonSegmentModalProps<IIntervetion[]>, "onValidChange">;

export const InterventionPage = ({ interventions, onChange }: Props) => {
  const [selected, setSelected] = useState<IIntervetion | null>(null);

  const [toDelete, setToDelete] = useState<IIntervetion | null>(null);

  const [toEdit, setToEdit] = useState<IIntervetion | null>(null);

  const [addInterventionModalOpen, setAddInterventionModalOpen] =
    useState(false);

  const [observation, setObservation] = useState<string>("");

  const [dose, setDose] = useState<Doses | undefined>(undefined);

  const changeSelected = (intervention: IIntervetion) => {
    setSelected(intervention);
    setObservation(intervention.observation ?? "");
    setDose(intervention?.dose ?? undefined);
  };

  const openAddModal = () => {
    setAddInterventionModalOpen(true);
  };

  const closeAddModal = () => {
    setAddInterventionModalOpen(false);
  };

  const onAddIntervention = (intervention: CreateIntervention) => {
    const newIntervention: IIntervetion = {
      ...intervention,
      datetime: intervention.datetime?.toISOString(),
      observation: intervention.observation ?? "",
      _id: uuidv4(),
      createdAt: fakeDate,
      updatedAt: fakeDate,
    };

    const newInterventions: IIntervetion[] = [
      ...interventions,
      newIntervention,
    ];

    onChange(newInterventions);
  };

  const deleteById = (id: string) => {
    const index = interventions.findIndex((i) => i._id === id);
    const newInterventions = update(interventions, {
      $splice: [[index, 1]],
    });
    onChange(newInterventions);
  };

  const edit = (intervention: CreateIntervention) => {
    if (toEdit) {
      const _id = toEdit._id;
      const index = interventions.findIndex((i) => i._id === _id);

      const updatedInterventions = update(interventions, {
        [index]: {
          $merge: {
            ...intervention,
            datetime: intervention.datetime?.toISOString(),
            observation: intervention.observation ?? "",
          },
        },
      });

      onChange(updatedInterventions);
    }
  };

  const onBlurObservation = () => {
    if (selected) {
      const index = interventions.findIndex((i) => i._id === selected._id);

      const updatedInterventions = update(interventions, {
        [index]: {
          $merge: {
            observation,
          },
        },
      });

      onChange(updatedInterventions);
    }
  };

  const onChangeDose = (dose: Doses) => {
    if (selected) {
      setDose(dose);

      const index = interventions.findIndex((i) => i._id === selected._id);

      const updatedInterventions = update(interventions, {
        [index]: {
          $merge: {
            dose,
          },
        },
      });

      onChange(updatedInterventions);
    }
  };

  return (
    <>
      <Container>
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
                onClick={() => changeSelected(intervention)}
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
            <>
              <Select
                label={`Observation about '${selected.name}'`}
                options={ALL_DOSES}
                getLabel={(option) => option.label}
                getValue={(option) => option.value}
                id="select-dose"
                value={dose}
                onChange={(e) => onChangeDose(e.target.value as Doses)}
              />
              <TextArea
                minRows={15}
                maxRows={15}
                onChange={(e) => setObservation(e.target.value)}
                value={observation}
                onBlur={onBlurObservation}
              />
            </>
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
            defaultValues={{
              ...toEdit,
              datetime: !!toEdit.datetime
                ? new Date(toEdit.datetime)
                : undefined,
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
  ${media.down.tablet`
    width: 100%;
  `}
`;

const ListIntervention = styled(FlexColumn)`
  width: 50%;
  ${media.down.tablet`
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
