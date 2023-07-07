import { Button } from "@components/Button";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { IEpisode } from "types";
import { getDateAndTimeFromIsoDate } from "@utils/helpers/date";
import { useUpdateEpisode } from "@queries/episode/useEpisode";

const episodeSchema = z.object({
  name: z.string().nonempty("Name is required"),
  location: z.string().optional(),
  diagnosis: z.string().optional(),
  start_date: z.string().optional(),
  comment: z.string().optional(),
});

type EpisodeSchema = z.infer<typeof episodeSchema>;

type EpisodeFormProps = {
  episode: IEpisode;
};

export const EpisodeForm = ({ episode }: EpisodeFormProps) => {
  const { register, handleSubmit, formState, reset } = useForm<EpisodeSchema>({
    resolver: zodResolver(episodeSchema),
    defaultValues: {
      name: episode.name,
      location: episode.location,
      diagnosis: episode.diagnosis,
      start_date: getDateAndTimeFromIsoDate(episode?.start_date),
      comment: episode.comment,
    },
  });

  const updateEpisode = useUpdateEpisode();

  const { errors, isDirty } = formState;

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
      <Container>
        <Grid container spacing={4}>
          <Grid xs={5}>
            <TextField
              label="Episode name"
              required
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xs={5}>
            <TextField
              label="Geographic location"
              {...register("location")}
              error={errors.location?.message}
            />
          </Grid>
          <Grid xs={5}>
            <TextField
              label="Diagnosis/harm"
              {...register("diagnosis")}
              error={errors.diagnosis?.message}
            />
          </Grid>
          <Grid xs={5}>
            <TextField
              label="Date and time of start"
              type="datetime-local"
              {...register("start_date")}
              error={errors.start_date?.message}
            />
          </Grid>
          <Grid xs={11}>
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
