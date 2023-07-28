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
import { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().nonempty(),
  pain_type: z.enum(["psychological", "physical"]),
  comment: z.string().optional(),
});

export type TrackEditType = z.infer<typeof schema>;

type TrackDetailsPageProps = {
  track: ITrack;
  onChange: (data: TrackEditType) => void;
  onValidChange: (valid: boolean) => void;
};

export const TrackDetailsPage = ({
  track,
  onChange,
  onValidChange,
}: TrackDetailsPageProps) => {
  const { register, formState, handleSubmit, getValues } =
    useForm<TrackEditType>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: track.name,
        pain_type: track.pain_type,
        comment: track.comment ?? "",
      },
      mode: "onChange",
    });

  const { errors, isValid, isDirty } = formState;

  const onUpdate = () => {
    onChange(getValues());
  };

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  return (
    <form onChange={onUpdate}>
      <Container gap={4} align="flex-start">
        <Grid container spacing={4} width="50%">
          <Grid xs={12}>
            <TextField
              label="Name"
              placeholder="Arm fracture"
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xs={12}>
            <FlexColumn gap={2} align="flex-start">
              <Text variant="body2Bold">Type of pain</Text>
              <FlexRow gap={6}>
                <Radio
                  label="Psychological"
                  {...register("pain_type")}
                  value="psychological"
                />
                <Radio
                  label="Physical"
                  {...register("pain_type")}
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
            {...register("comment")}
          />
        </FlexColumn>
      </Container>
    </form>
  );
};

const Container = styled(FlexRow)``;
