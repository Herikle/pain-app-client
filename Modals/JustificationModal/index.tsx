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
import { media } from "@styles/media-query";
import { BackButton } from "@components/BackButton";
import { FlexColumn } from "@design-components/Flex";

const justificationSchema = z.object({
  title: z.string().optional(),
  type_of_evidence: z.string().optional(),
  description: z.string().optional(),
  sources: z.string().optional(),
  ranking: z.object({
    excruting: z.number().optional(),
    disabling: z.number().optional(),
    hurful: z.number().optional(),
    annoying: z.number().optional(),
    no_pain: z.number().optional(),
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
  const { register, handleSubmit, setValue } = useForm<JustificationFormValues>(
    {
      resolver: zodResolver(justificationSchema),
      defaultValues: justification,
    }
  );

  return (
    <Modal
      onClose={onClose}
      removePadding
      removeOverlay
      fullScreenOnMobile
      height="fit-content"
    >
      <Container>
        <FlexColumn gap={2}>
          <BackButton text="Return to intensities menu" onClick={onClose} />
          <Text variant="h1">Evidence</Text>
          <Grid container spacing={2}>
            <Grid xs={10}>
              <TextField label="Title" {...register("title")} />
            </Grid>
            <Grid xs={2}>
              <Select
                label="Type of evidence"
                options={[
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
                ]}
                {...register("type_of_evidence")}
                getLabel={(option) => option.label}
                getValue={(option) => option.value}
                id="type_of_evidence"
              />
            </Grid>
            <Grid xs={12}>
              <TextArea
                label="Description"
                {...register("description")}
                minRows={7}
              />
            </Grid>
            <Grid xs={12}>
              <TextField label="Sources" {...register("sources")} />
            </Grid>
          </Grid>
          <FlexColumn>
            <Text variant="body1Bold">
              How this information supports each level of pain
            </Text>
          </FlexColumn>
          <Text variant="h2">Working in progress...</Text>
        </FlexColumn>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 950px;
  height: 80vh;
  max-width: 80vw;
  position: relative;
  padding: 2rem;
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
