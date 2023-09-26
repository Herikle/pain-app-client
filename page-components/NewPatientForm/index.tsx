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

const newPatientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  birth_date: z.date({
    required_error: "Date of birth is required",
  }),
  about: z.string().optional(),
});

type PatientSchema = z.infer<typeof newPatientSchema>;

export const NewPatientForm = () => {
  const { register, handleSubmit, formState, control } = useForm<PatientSchema>(
    {
      resolver: zodResolver(newPatientSchema),
    }
  );

  const { errors } = formState;

  const { isDirty } = formState;

  const createPatient = useCreatePatient();

  const onSubmit = async (data: PatientSchema) => {
    const created_patient = await createPatient.mutateAsync({
      body: data,
    });
    Router.push(RoutesPath.patient.replace("[id]", created_patient._id));
  };

  useFormPrompt(isDirty);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UnsavedChangesDialog shouldConfirmLeave={isDirty} />
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
`;
