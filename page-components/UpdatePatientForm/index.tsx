import { Button } from "@components/Button";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { IPatient } from "types";
import { getOnlyDateFromIsoDate } from "@utils/helpers/date";

const newPatientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  birth_date: z.string().nonempty("Date of birth is required"),
  about: z.string().optional(),
});

type PatientSchema = z.infer<typeof newPatientSchema>;

type UpdatePatientFormProps = {
  patient: IPatient;
};

export const UpdatePatientForm = ({ patient }: UpdatePatientFormProps) => {
  const { register, handleSubmit, formState } = useForm<PatientSchema>({
    resolver: zodResolver(newPatientSchema),
    defaultValues: {
      name: patient.name,
      birth_date: getOnlyDateFromIsoDate(patient.birth_date),
      about: patient.about,
    },
  });

  const { errors, isDirty } = formState;

  const onSubmit = (data: PatientSchema) => {
    console.log(data);
    alert("Not implemented yet");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Grid container spacing={4}>
          <Grid xs={6}>
            <TextField
              label="Name"
              placeholder="Choose a name"
              required
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Date of birth"
              placeholder="DD/MM/YYYY"
              type="date"
              required
              {...register("birth_date")}
              error={errors.birth_date?.message}
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
        <Button width="160px" disabled={!isDirty}>
          Save changes
        </Button>
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 1rem;
`;
