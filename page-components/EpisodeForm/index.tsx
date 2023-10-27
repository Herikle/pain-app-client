import { Button } from "@components/Button";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { IEpisode } from "types";
import { getDateAndTimeFromIsoDate } from "@utils/helpers/date";
import { useUpdateEpisode } from "@queries/episode/useEpisode";
import { useFormPrompt } from "@utils/hooks/useFormPrompt";
import { UnsavedChangesDialog } from "@components/UnsavedChangesDialog";
import { DateTimePicker } from "@components/DateTimePicker";
import { theme } from "@styles/theme";
import { Text } from "@components/Text";
import { TimePicker } from "@components/TimePicker";
import { DatePicker } from "@components/DatePicker";
import { DateAndTimePicker } from "@components/DateAndTimePicker";

const episodeSchema = z.object({
  name: z.string().nonempty("Name is required"),
  location: z.string().optional(),
  diagnosis: z.string().optional(),
  start_date: z.date().optional(),
  comment: z.string().optional(),
});

type EpisodeSchema = z.infer<typeof episodeSchema>;

type EpisodeFormProps = {
  episode: IEpisode;
};

export const EpisodeForm = ({ episode }: EpisodeFormProps) => {
  const { register, handleSubmit, formState, reset, setValue, watch, control } =
    useForm<EpisodeSchema>({
      resolver: zodResolver(episodeSchema),
      defaultValues: {
        name: episode.name,
        location: episode.location,
        diagnosis: episode.diagnosis,
        start_date: !!episode?.start_date
          ? new Date(episode?.start_date)
          : undefined,
        comment: episode.comment,
      },
    });

  const updateEpisode = useUpdateEpisode();

  const { errors, isDirty } = formState;

  useFormPrompt(isDirty);

  const onSubmit = async (data: EpisodeSchema) => {
    await updateEpisode.mutateAsync({
      params: {
        episode_id: episode._id,
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
          <Grid xl={5} lg={5} md={5} sm={12} xs={12}>
            <TextField
              label="Episode name"
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xl={5} lg={5} md={5} sm={12} xs={12}>
            <TextField
              label="Geographic location"
              {...register("location")}
              error={errors.location?.message}
            />
          </Grid>
          <Grid xl={5} lg={5} md={5} sm={12} xs={12}>
            <TextField
              label="Diagnosis/harm"
              {...register("diagnosis")}
              error={errors.diagnosis?.message}
            />
          </Grid>
          <Grid xl={5} lg={5} md={5} sm={12} xs={12}>
            <Controller
              control={control}
              name="start_date"
              render={({ field: { onChange, value } }) => (
                <DateAndTimePicker
                  timeLabel="Time of start"
                  dateLabel="Date of start"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid xl={10} lg={10} md={10} sm={12} xs={12}>
            <TextArea
              label="Comment"
              minRows={7}
              maxRows={7}
              {...register("comment")}
              error={errors.comment?.message}
            />
          </Grid>
        </Grid>
        <Button
          width="160px"
          loading={updateEpisode.isLoading}
          disabled={!isDirty}
        >
          Save
        </Button>
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 1rem;
`;
