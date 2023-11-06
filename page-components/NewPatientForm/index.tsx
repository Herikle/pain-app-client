import { Button } from "@components/Button";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
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
import { Select } from "@components/Select";
import { media } from "@styles/media-query";

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
  production_system: z.string().optional(),
  life_fate: z.string().optional(),
  type: z.enum(["animal", "human"]),
});

type PatientSchema = z.infer<typeof newPatientSchema>;

export const NewPatientForm = () => {
  const { register, handleSubmit, formState, control, watch } =
    useForm<PatientSchema>({
      resolver: zodResolver(newPatientSchema),
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
      <Container>
        <Grid container spacing={4}>
          <Grid xs={6}>
            <TextField
              label="Name *"
              placeholder="Choose a name"
              autoFocus
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xs={6}>
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
          <Grid xs={12}>
            <Select
              options={PatientTypeOptions}
              defaultValue={PatientTypeOptions[1].id}
              getLabel={(option) => option.label}
              getValue={(option) => option.id}
              id="patient-type"
              label="Patient type *"
              {...register("type")}
            />
          </Grid>
          {watch("type") === "animal" && (
            <>
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
