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
import { DatePicker } from "@components/DatePicker";
import { Text } from "@components/Text";
import { Radio } from "@components/Radio";
import { useEffect, useState } from "react";
import { useDebounce } from "@utils/hooks/useDebounce";
import { useGetScientificNameBySpecie } from "@queries/sugestion/useGetSugestion";
import { useSetPatientState } from "state/usePatientState";
import { LoadingWrapper } from "@components/LoadingWrapper";

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

  const { register, formState, handleSubmit, control, watch, setValue } =
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

  const setPatientState = useSetPatientState(patient._id);

  const { errors, isDirty } = formState;

  const onSubmit = async (data: Partial<PatientSchema>) => {
    if (!isDirty) return;
    updatePatient.mutateAsync({
      params: {
        patient_id: patient._id,
      },
      body: data,
    });
  };

  const commmon_name_debounce = useDebounce(watch("common_name"), 1000);

  const getScientificName = useGetScientificNameBySpecie({
    specie: commmon_name_debounce,
  });

  useEffect(() => {
    if (!getScientificName.data) return;
    setValue("scientific_name", getScientificName.data?.scientific_name);
  }, [getScientificName.data, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      setFormData(value);

      if (name === "common_name") {
        setPatientState((state) => ({
          ...(state ?? {}),
          commonName: value.common_name,
        }));
      }

      if (name === "name") {
        setPatientState((state) => ({
          ...(state ?? {}),
          name: value.name,
        }));
      }

      if (name === "type") {
        setPatientState((state) => ({
          ...(state ?? {}),
          type: value.type,
        }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setPatientState]);

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
              <Text variant="body2Bold">Subject Type</Text>
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
                />
              </Grid>
              <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
                <FlexRow
                  justify="flex-start"
                  style={{
                    position: "relative",
                  }}
                >
                  <LoadingWrapper
                    loading={getScientificName.isLoading}
                    overContainer
                    size={12}
                    style={{
                      left: 8,
                    }}
                  />
                  <TextField
                    label="Scientifc Name"
                    placeholder="Name of the species"
                    disabled
                    noBorder={true}
                    {...register("scientific_name")}
                  />
                </FlexRow>
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Production System or Living Conditions"
                  placeholder="(e.g intensive, organic, intensive production, pasture raised, lab cage, zoo cage)"
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
              label="About the subject"
              placeholder="Any comments about the subject"
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
