import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { IPatient } from "types";
import { getDateFromString } from "@utils/helpers/date";
import { useUpdatePatient } from "@queries/patient/usePatient";
import { UnsavedChangesDialog } from "@components/UnsavedChangesDialog";
import { DatePicker } from "@components/DatePicker";
import { Text } from "@components/Text";
import { Radio } from "@components/Radio";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "@utils/hooks/useDebounce";
import { useGetScientificNameBySpecie } from "@queries/sugestion/useGetSugestion";

const newPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birth_date: z.date().optional().nullable(),
  about: z.string().optional(),
  common_name: z.string().optional(),
  scientific_name: z.string().optional(),
  production_system: z.string().optional(),
  life_fate: z.string().optional(),
  type: z.enum(["animal", "human"]),
  location: z.string().optional(),
});

type PatientSchema = z.infer<typeof newPatientSchema>;

type UpdatePatientFormProps = {
  patient: IPatient;
  onIsSyncingChange?: (isSyncing: boolean) => void;
};

export const UpdatePatientForm = ({
  patient,
  onIsSyncingChange,
}: UpdatePatientFormProps) => {
  const [formData, setFormData] = useState<Partial<PatientSchema> | null>(null);

  const debouncedFormValue = useDebounce(formData, 500);

  const { register, formState, handleSubmit, reset, control, watch } =
    useForm<PatientSchema>({
      resolver: zodResolver(newPatientSchema),
      defaultValues: {
        name: patient.name,
        birth_date: getDateFromString(patient.birth_date),
        type: patient.type,
        about: patient.about ?? "",
        production_system: patient.production_system ?? "",
        life_fate: patient.life_fate ?? "",
        location: patient.location ?? "",
        common_name: patient.common_name ?? "",
        scientific_name: patient.scientific_name ?? "",
      },
      mode: "onChange",
    });

  const updatePatient = useUpdatePatient();

  const { errors, isDirty } = formState;

  const onSubmit = async (data: Partial<PatientSchema>) => {
    if (!isDirty) return;
    await updatePatient.mutateAsync({
      params: {
        patient_id: patient._id,
      },
      body: data,
    });
    reset(data);
  };
  const useGetScientificName = useGetScientificNameBySpecie();

  const getScientificName = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      useGetScientificName.mutate(event.currentTarget.value);
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    if (debouncedFormValue) {
      const isValid = newPatientSchema.safeParse(debouncedFormValue);

      if (!isValid.success) {
        return;
      }

      handleSubmit(onSubmit)(debouncedFormValue as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormValue]);

  useEffect(() => {
    onIsSyncingChange?.(updatePatient.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePatient.isLoading]);

  return (
    <form>
      <Container>
        <Grid container spacing={4}>
          <Grid xl={12} lg={12} md={12} sm={12} xs={12}>
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
                  disableFuture
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
          {watch("type") === "animal" && (
            <>
              <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Common name"
                  placeholder="Name of the species"
                  {...register("common_name")}
                  onKeyDown={(event) => getScientificName(event)}
                />
              </Grid>
              <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
                <h1>{useGetScientificName?.data?.scientific_name || ""}</h1>
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
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
`;
