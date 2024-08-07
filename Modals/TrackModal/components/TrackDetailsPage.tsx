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
import { media, useMatchMediaUp } from "@styles/media-query";

const schema = z.object({
  name: z.string().nonempty(),
  pain_type: z.enum(["psychological", "physical"]),
  comment: z.string().optional(),
});

export type TrackEditType = z.infer<typeof schema>;

type TrackItemDetailsPage = {
  name: string;
  pain_type: "psychological" | "physical";
  comment?: string;
};

type TrackDetailsPageProps = {
  track: TrackItemDetailsPage;
  onChange: (data: Partial<TrackEditType>) => void;
};

export const TrackDetailsPage = ({
  track,
  onChange,
}: TrackDetailsPageProps) => {
  const { register, formState, getValues, watch } = useForm<TrackEditType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: track.name,
      pain_type: track.pain_type,
      comment: track.comment ?? "",
    },
    mode: "onChange",
  });

  const { errors } = formState;

  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, onChange]);

  const isTablet = useMatchMediaUp("tablet");

  return (
    <form>
      <Container>
        <Grid container spacing={4} width={isTablet ? "100%" : "50%"}>
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
              <FlexColumn>
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
              </FlexColumn>
            </FlexColumn>
          </Grid>
        </Grid>
        <FlexColumn
          width={isTablet ? "100%" : "50%"}
          gap={4}
          justify="flex-start"
        >
          <TextArea
            label="Comments"
            minRows={12}
            maxRows={12}
            {...register("comment")}
          />
        </FlexColumn>
      </Container>
    </form>
  );
};

const Container = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;

  ${media.up.tablet`
    flex-direction: column;
  `}
`;
