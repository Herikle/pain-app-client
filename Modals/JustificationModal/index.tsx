import { ISegmentJustification } from "types";
import { useForm, z, zodResolver } from "utils/helpers/form-validation";
import { useJustificationModalState } from "./hooks";
import { Modal } from "Modals/Modal";
import Grid from "@mui/material/Unstable_Grid2";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { Select } from "@components/Select";
import { TextArea } from "@components/TextArea";
import styled from "styled-components";
import { media, useMatchMediaUp } from "@styles/media-query";
import { BackButton } from "@components/BackButton";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { LightScrollBar, theme } from "@styles/theme";
import { Trash } from "@phosphor-icons/react";
import { Button } from "@components/Button";
import { notImplemented } from "@utils/helpers/dev";
import {
  useDeleteSegmentJustification,
  useUpdateSegmentJustification,
} from "@queries/segment-justification/useSegmentJustification";
import { useState } from "react";
import { ConfirmActionModal } from "Modals/ConfirmActionModal";

export const Evidences = [
  {
    label: "Behavioral",
    value: "behavioral",
  },
  {
    label: "Neurological",
    value: "neurological",
  },
  {
    label: "Physiological",
    value: "physiological",
  },
  {
    label: "Pharmacological",
    value: "pharmacological",
  },
];

const painLevels = [
  {
    value: "excruciating",
    label: "Excruciating",
  },
  {
    value: "disabling",
    label: "Disabling",
  },
  {
    value: "hurful",
    label: "Hurful",
  },
  {
    value: "annoying",
    label: "Annoying",
  },
  {
    value: "no_pain",
    label: "No pain",
  },
];

const levelsResult = {
  0: "(Ψ) Reject",
  1: "(-) Contradict",
  2: "(Ο) Neutral",
  3: "(+) Support",
  4: "(Ω) Confirm",
};

export type IJustificationType =
  | "behavioral"
  | "neurological"
  | "physiological"
  | "pharmacological";

const justificationSchema = z.object({
  title: z.string().optional(),
  type_of_evidence: z
    .enum(["behavioral", "neurological", "physiological", "pharmacological"])
    .optional()
    .nullable(),
  description: z.string().optional(),
  sources: z.string().optional(),
  ranking: z.object({
    excruciating: z.number(),
    disabling: z.number(),
    hurful: z.number(),
    annoying: z.number(),
    no_pain: z.number(),
  }),
});

type JustificationFormValues = z.infer<typeof justificationSchema>;

export type JustificationModalProps = {
  justification: ISegmentJustification;
  onClose: () => void;
};

const JustificationModal = ({
  justification,
  onClose,
}: JustificationModalProps) => {
  const updateJustification = useUpdateSegmentJustification();

  const deleteJustification = useDeleteSegmentJustification();

  const [deleteModal, setDeleteModal] = useState(false);

  const { register, formState, watch, reset, handleSubmit } =
    useForm<JustificationFormValues>({
      resolver: zodResolver(justificationSchema),
      defaultValues: {
        title: justification.title ?? "",
        type_of_evidence: justification.type_of_evidence ?? null,
        description: justification.description ?? "",
        sources: justification.sources ?? "",
        ranking: {
          excruciating: justification.ranking.excruciating ?? 0,
          disabling: justification.ranking.disabling ?? 0,
          hurful: justification.ranking.hurful ?? 0,
          annoying: justification.ranking.annoying ?? 0,
          no_pain: justification.ranking.no_pain ?? 0,
        },
      },
    });

  const confirmDelete = async () => {
    await deleteJustification.mutateAsync({
      params: {
        justification_id: justification._id,
      },
      helpers: {
        segment_id: justification.segment_id,
      },
    });
    onClose();
  };

  const { isDirty } = formState;

  const onSubmit = async (values: JustificationFormValues) => {
    await updateJustification.mutateAsync({
      params: {
        justification_id: justification._id,
      },
      body: {
        title: values.title,
        type_of_evidence: values.type_of_evidence ?? undefined,
        description: values.description,
        sources: values.sources,
        ranking: values.ranking,
      },
    });

    reset(values);
  };

  const isMobile = useMatchMediaUp("tablet");

  return (
    <>
      <Modal
        onClose={onClose}
        removePadding
        removeOverlay
        fullScreenOnMobile
        height="fit-content"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <FlexColumn gap={2} height="100%">
              <BackButton text="Return to intensities menu" onClick={onClose} />
              <Text variant="h1">Evidence</Text>
              <BodyContent gap={1}>
                <Grid container spacing={2} margin="0">
                  <Grid
                    xl={10}
                    lg={10}
                    md={10}
                    sm={12}
                    xs={12}
                    padding="0"
                    paddingBlock="0.5rem"
                    paddingRight={isMobile ? undefined : "1rem"}
                  >
                    <TextField fullWidth label="Title" {...register("title")} />
                  </Grid>
                  <Grid
                    xl={2}
                    lg={2}
                    md={2}
                    sm={12}
                    xs={12}
                    padding="0"
                    paddingBlock="0.5rem"
                  >
                    <Select
                      label="Type of evidence"
                      options={Evidences}
                      {...register("type_of_evidence")}
                      getLabel={(option) => option.label}
                      getValue={(option) => option.value}
                      id="type_of_evidence"
                    />
                  </Grid>
                  <Grid xs={12} padding="0" paddingBlock="0.5rem">
                    <TextArea
                      label="Description"
                      {...register("description")}
                      minRows={5}
                    />
                  </Grid>
                  <Grid xs={12} padding="0" paddingBlock="0.5rem">
                    <TextField label="Sources" {...register("sources")} />
                  </Grid>
                </Grid>
                <FlexColumn>
                  <Text variant="body1Bold">
                    How this information supports each level of pain
                  </Text>
                </FlexColumn>
                <PainLevelsSwitch>
                  {painLevels.map((painLevel) => (
                    <PainLevelRow
                      key={painLevel.value}
                      align="center"
                      justify="flex-start"
                      gap={1}
                    >
                      <Text
                        variant="h3"
                        customColor={theme.pain_level_colors[painLevel.value]}
                        minWidth="110px"
                      >
                        {painLevel.label}
                      </Text>
                      <TextField
                        inputSize="small"
                        noPadding
                        type="range"
                        min={0}
                        max={4}
                        step={1}
                        fullWidth
                        id={`ranking.${painLevel.value}`}
                        {...register(`ranking.${painLevel.value}` as any, {
                          valueAsNumber: true,
                        })}
                        style={{
                          marginTop: "5px",
                        }}
                      />
                      <Text variant="h3" whiteSpace="nowrap" minWidth="120px">
                        {
                          levelsResult[
                            watch(`ranking.${painLevel.value}` as any)
                          ]
                        }
                      </Text>
                    </PainLevelRow>
                  ))}
                </PainLevelsSwitch>
              </BodyContent>
              <ButtonsFooter>
                <Trash
                  onClick={() => setDeleteModal(true)}
                  size={32}
                  color={theme.colors.text_switched}
                  cursor="pointer"
                />
                <Button
                  type="submit"
                  width="160px"
                  disabled={!isDirty}
                  loading={updateJustification.isLoading}
                >
                  Save changes
                </Button>
              </ButtonsFooter>
            </FlexColumn>
          </Container>
        </form>
      </Modal>
      {deleteModal && (
        <ConfirmActionModal
          title="Delete justification"
          description={`Are you sure you want to delete the justification "${justification.title}"?`}
          onClose={() => setDeleteModal(false)}
          onConfirm={confirmDelete}
          loading={deleteJustification.isLoading}
        />
      )}
    </>
  );
};

const BodyContent = styled(FlexColumn)`
  ${LightScrollBar};
  overflow: auto;
  height: 100%;
  padding-right: 1rem;
`;

const ButtonsFooter = styled(FlexRow)`
  justify-content: space-between;
  ${media.up.tablet`
    padding-inline: 2rem;
  `}
`;

const PainLevelRow = styled(FlexRow)`
  min-height: 1.5rem;
`;

const PainLevelsSwitch = styled(FlexColumn)`
  margin-inline: auto;
  width: 500px;
  margin-top: 1rem;
`;

const Container = styled.div`
  width: 950px;
  height: 80vh;
  max-width: 80vw;
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  ${media.up.laptopL`
    height: 95vh;
  `}
  justify-content: space-between;
  ${media.up.tablet`
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;   
    padding: 1rem; 
  `}

  ${media.up.mobileL`
    padding: 0;
    padding-bottom: 1rem;
    padding-top: 1rem;  
    padding-inline: 1rem;
  `}
`;

export const JustificationModalWrapper = () => {
  const [justificationModal, setJustificationModal] =
    useJustificationModalState();

  if (!justificationModal) return null;

  const close = () => {
    setJustificationModal(null);
  };

  return <JustificationModal {...justificationModal} onClose={close} />;
};
