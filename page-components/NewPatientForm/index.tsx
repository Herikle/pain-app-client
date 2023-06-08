import { Button } from "@components/Button";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { useCreatePatient } from "@queries/patient/usePatient";
import Router from "next/router";
import { RoutesPath } from "@utils/routes";

const newPatientSchema = z.object({
  name: z.string().nonempty("Name is required"),
  birth_date: z.string().nonempty("Date of birth is required"),
  about: z.string().optional(),
});

type PatientSchema = z.infer<typeof newPatientSchema>;

export const NewPatientForm = () => {
  const { register, handleSubmit, formState } = useForm<PatientSchema>({
    resolver: zodResolver(newPatientSchema),
  });

  const { errors } = formState;

  const createPatient = useCreatePatient();

  const onSubmit = async (data: PatientSchema) => {
    const created_patient = await createPatient.mutateAsync({
      body: data,
    });
    Router.push(RoutesPath.patient.replace(":id", created_patient._id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Grid container spacing={4}>
          <Grid xs={6}>
            <TextField
              label="Name *"
              placeholder="Choose a name"
              required
              autoFocus
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Date of birth *"
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
