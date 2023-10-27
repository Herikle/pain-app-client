import { Button } from "@components/Button";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { IPatient } from "types";
import { getDateFromString, getOnlyDateFromIsoDate } from "@utils/helpers/date";
import { useUpdatePatient } from "@queries/patient/usePatient";
import { Trash } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { useSetDeletePatientModal } from "Modals/DeletePatientModal/hook";
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

type UpdatePatientFormProps = {
  patient: IPatient;
};

export const UpdatePatientForm = ({ patient }: UpdatePatientFormProps) => {
  const { register, handleSubmit, formState, reset, control } =
    useForm<PatientSchema>({
      resolver: zodResolver(newPatientSchema),
      defaultValues: {
        name: patient.name,
        birth_date: getDateFromString(patient.birth_date),
        about: patient.about,
      },
    });

  const updatePatient = useUpdatePatient();

  const { errors, isDirty } = formState;

  useFormPrompt(isDirty);

  const onSubmit = async (data: PatientSchema) => {
    await updatePatient.mutateAsync({
      params: {
        patient_id: patient._id,
      },
      body: data,
    });
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UnsavedChangesDialog shouldConfirmLeave={isDirty} />
      <Container>
        <Grid container spacing={4}>
          <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Name"
              placeholder="Choose a name"
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
        <FlexRow justify="space-between">
          <Button
            width="160px"
            loading={updatePatient.isLoading}
            disabled={!isDirty}
          >
            Save changes
          </Button>
        </FlexRow>
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 1rem;
`;
