import { FlexColumn, FlexRow } from "@design-components/Flex";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";
import { TextArea } from "@components/TextArea";
import { Text } from "@components/Text";
import { Radio } from "@components/Radio";
import { ITrack } from "types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty(),
  pain_type: z.enum(["psychological", "physical"]),
  comment: z.string().optional(),
});

export type TrackEditType = z.infer<typeof schema>;

type TrackDetailsPageProps = {
  track: ITrack;
  onChange: (data: TrackEditType, isDirty: boolean) => void;
};

export const TrackDetailsPage = ({
  track,
  onChange,
}: TrackDetailsPageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TrackEditType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: track.name,
      pain_type: track.pain_type,
      comment: track.comment,
    },
  });

  const onSubmit = (data: TrackEditType) => {
    onChange(data, isDirty);
  };

  return (
    <Container gap={4} align="flex-start">
      <Grid container spacing={4} width="50%">
        <Grid xs={12}>
          <TextField
            label="Name"
            placeholder="Arm fracture"
            {...register("name", {
              onBlur: handleSubmit(onSubmit),
            })}
            error={errors.name?.message}
          />
        </Grid>
        <Grid xs={12}>
          <FlexColumn gap={2} align="flex-start">
            <Text variant="body2Bold">Type of pain</Text>
            <FlexRow gap={6}>
              <Radio
                label="Psychological"
                {...register("pain_type", {
                  onChange: (e) => console.log(e),
                })}
                value="psychological"
              />
              <Radio
                label="Physical"
                {...register("pain_type", {
                  onChange: (e) => console.log(e.target.value),
                })}
                value="physical"
              />
            </FlexRow>
          </FlexColumn>
        </Grid>
      </Grid>
      <FlexColumn width="50%" gap={4} justify="flex-start">
        <TextArea
          label="Comment"
          minRows={12}
          maxRows={12}
          {...register("comment", {
            onBlur: handleSubmit(onSubmit),
          })}
        />
      </FlexColumn>
    </Container>
  );
};

const Container = styled(FlexRow)``;
