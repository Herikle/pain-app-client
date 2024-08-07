import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { IEpisode } from "types";
import { useUpdateEpisode } from "@queries/episode/useEpisode";
import { DateAndTimePicker } from "@components/DateAndTimePicker";
import { useEffect, useState } from "react";
import { useDebounce } from "@utils/hooks/useDebounce";
import { useSetEpisodeState } from "state/useEpisodeState";

const episodeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().optional(),
  diagnosis: z.string().optional(),
  start_date: z.date().optional().nullable(),
  comment: z.string().optional(),
});

type EpisodeSchema = z.infer<typeof episodeSchema>;

type EpisodeFormProps = {
  episode: IEpisode;
  onIsSyncingChange?: (isSyncing: boolean) => void;
};

export const EpisodeForm = ({
  episode,
  onIsSyncingChange,
}: EpisodeFormProps) => {
  const [formData, setFormData] = useState<Partial<EpisodeSchema> | null>(null);

  const debouncedFormValue = useDebounce(formData, 600);

  const setEpisodeState = useSetEpisodeState(episode._id);

  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch,
    control,
    setValue,
    getValues,
  } = useForm<EpisodeSchema>({
    resolver: zodResolver(episodeSchema),
    defaultValues: {
      name: episode.name,
      location: episode.location,
      diagnosis: episode.diagnosis,
      start_date: !!episode?.start_date ? new Date(episode?.start_date) : null,
      comment: episode.comment,
    },
  });

  const updateEpisode = useUpdateEpisode();

  const { errors, isDirty } = formState;

  const onSubmit = async (data: EpisodeSchema) => {
    if (!isDirty) return;
    updateEpisode.mutateAsync({
      params: {
        episode_id: episode._id,
      },
      body: {
        ...data,
        start_date: data.start_date?.toISOString() ?? null,
      },
    });
  };

  const clearDate = async () => {
    setValue("start_date", null);
    const values = getValues();
    updateEpisode.mutateAsync({
      params: {
        episode_id: episode._id,
      },
      body: { start_date: null },
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      setFormData(value);
      if (name === "name") {
        setEpisodeState((prev) => ({
          ...(prev ?? {}),
          name: value.name,
        }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setEpisodeState]);

  useEffect(() => {
    if (debouncedFormValue) {
      const isValid = episodeSchema.safeParse(debouncedFormValue);

      if (!isValid.success) {
        return;
      }

      handleSubmit(onSubmit)(debouncedFormValue as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormValue]);

  useEffect(() => {
    onIsSyncingChange?.(updateEpisode.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEpisode.isLoading]);

  return (
    <form>
      <Container>
        <Grid container spacing={4}>
          <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Episode name"
              placeholder="Examples: Headache, Depression crisis, Tooth ache, Sunburn"
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Geographic location"
              {...register("location")}
              error={errors.location?.message}
            />
          </Grid>
          <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Diagnosis"
              {...register("diagnosis")}
              error={errors.diagnosis?.message}
              placeholder="Examples: Gastritis, Clinical depression, Influenza, Hip fracture"
            />
          </Grid>
          <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
            <Controller
              control={control}
              name="start_date"
              render={({ field: { onChange, value } }) => (
                <DateAndTimePicker
                  timeLabel="Time of start"
                  dateLabel="Date of start"
                  value={value}
                  onChange={onChange}
                  onClear={clearDate}
                />
              )}
            />
          </Grid>
          <Grid xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextArea
              label="Comments"
              minRows={7}
              maxRows={7}
              {...register("comment")}
              error={errors.comment?.message}
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
