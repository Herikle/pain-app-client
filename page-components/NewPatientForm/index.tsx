import { Button } from "@components/Button";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { useCreatePatient } from "@queries/patient/usePatient";
import Router from "next/router";
import { RoutesPath } from "@utils/routes";
import { useFormPrompt } from "@utils/hooks/useFormPrompt";
import { UnsavedChangesDialog } from "@components/UnsavedChangesDialog";
import { DatePicker } from "@components/DatePicker";
import { media } from "@styles/media-query";
import { Radio } from "@components/Radio";
import { Text } from "@components/Text";
import { Badge } from "@components/Badge";
import { IconsPath } from "@utils/icons";

export const PatientTypeOptions = [
  {
    id: "animal",
    label: "Animal",
  },
  {
    id: "human",
    label: "Human",
  },
];

const newPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birth_date: z.date({
    required_error: "Date of birth is required",
  }),
  about: z.string().optional(),
  common_name: z.string().optional(),
  scientific_name: z.string().optional(),
  production_system: z.string().optional(),
  life_fate: z.string().optional(),
  type: z.enum(["animal", "human"]),
  location: z.string().optional(),
});

type PatientSchema = z.infer<typeof newPatientSchema>;

export const NewPatientForm = () => {
  const { register, handleSubmit, formState, control, watch } =
    useForm<PatientSchema>({
      resolver: zodResolver(newPatientSchema),
      defaultValues: {
        type: "human",
      },
    });

  const { errors } = formState;

  const { isDirty } = formState;

  const createPatient = useCreatePatient();

  const onSubmit = async (data: PatientSchema) => {
    const created_patient = await createPatient.mutateAsync({
      body: data,
    });
    Router.push(RoutesPath.patient.replace("[id]", created_patient._id));
  };

  const shouldWarningUser =
    isDirty && !createPatient.isSuccess && !createPatient.isLoading;

  useFormPrompt(shouldWarningUser);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UnsavedChangesDialog shouldConfirmLeave={shouldWarningUser} />
      <Wrapper>
        <Badge
          label="Add new patient"
          iconPath={
            watch("type") === "human" ? IconsPath.Patient : IconsPath.Animal
          }
        />
        <Container>
          <Grid container spacing={4}>
            <Grid xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                label="Name *"
                placeholder="Choose a name"
                autoFocus
                {...register("name")}
                error={errors.name?.message}
              />
            </Grid>
            <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
              <Controller
                name="birth_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date of birth"
                    error={errors.birth_date?.message}
                  />
                )}
              />
            </Grid>
            <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
              <FlexColumn height="100%" gap={1.5}>
                <Text variant="body2Bold">Patient Type</Text>
                <FlexRow gap={6}>
                  <Radio label="Human" value="human" {...register("type")} />
                  <Radio label="Animal" value="animal" {...register("type")} />
                </FlexRow>
              </FlexColumn>
            </Grid>
            <Grid xs={12}>
              <TextField label="Location" {...register("location")} />
            </Grid>
            {watch("type") === "animal" && (
              <>
                <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    label="Common name"
                    placeholder="Name of the species"
                    {...register("common_name")}
                  />
                </Grid>
                <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    label="Scientific name"
                    placeholder="Scientific name of the subject"
                    {...register("scientific_name")}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label="Production system"
                    placeholder="(e.g intensive, organic),"
                    {...register("production_system")}
                    error={errors.production_system?.message}
                    id="production-system"
                    helperText="Production system refers to a specific method or approach used to manage and care for animals with the aim of maximizing their production or output. It involves integrating various aspects such as housing, nutrition, breeding or health management."
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label="Life circunstances (or life-fate)"
                    placeholder="(e.g pet, breeder, market animal)"
                    {...register("life_fate")}
                    error={errors.life_fate?.message}
                    id="life-fate"
                    helperText="Life circumstance refers to the unique conditions and factors that influence an animal's well-being, health, and overall quality of life. It encompasses aspects such as environmental conditions, social interactions, diet, exercise, and overall management practices."
                  />
                </Grid>
              </>
            )}
            <Grid xs={12}>
              <TextArea
                label="About the patient"
                placeholder="Write something about that patient..."
                minRows={7}
                maxRows={14}
                {...register("about")}
                error={errors.about?.message}
              />
            </Grid>
          </Grid>
          <Button width="160px" loading={createPatient.isLoading}>
            Add patient
          </Button>
        </Container>
      </Wrapper>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 1rem;
  width: 710px;
  ${media.up.laptop`
      width:100%;
  `}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
`;
