import { FlexColumn, FlexRow } from "@design-components/Flex";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";
import { Radio } from "@components/Radio";
import { TextArea } from "@components/TextArea";
import { Select } from "@components/Select";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { getDateAndTimeFromIsoDate } from "@utils/helpers/date";
import { setValueAsNumber } from "@utils/helpers/zodValidation";
import { CommonSegmentModalProps } from "../..";
import { media, useMatchMediaUp } from "@styles/media-query";
import { DateTimePicker } from "@components/DateTimePicker";

const SegmentPageSchema = z.object({
  name: z.string().optional(),
  start: z.number().nonnegative().optional(),
  end: z.number().nonnegative().optional(),
  time_unit: z.enum(["minutes", "hours", "days"]),
  start_date: z.string().optional(),
  estimative_type: z.enum(["reported", "measured", "inferred"]),
  pain_type: z.enum(["acute", "chronic"]),
  comment: z.string().optional(),
});

export type SegmentPageForm = z.infer<typeof SegmentPageSchema>;

type Props = {
  segmentPageForm: SegmentPageForm;
} & CommonSegmentModalProps<SegmentPageForm>;

export const SegmentPage = ({
  segmentPageForm,
  onChange,
  onValidChange,
}: Props) => {
  const { register, getValues, formState, control } = useForm<SegmentPageForm>({
    resolver: zodResolver(SegmentPageSchema),
    defaultValues: {
      ...segmentPageForm,
      start_date: segmentPageForm?.start_date,
    },
    mode: "onChange",
  });

  const onUpdate = () => {
    onChange(getValues());
  };

  const { errors, isValid } = formState;

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  const isMobileL = useMatchMediaUp("mobileL");

  return (
    <form onChange={onUpdate}>
      <Container>
        <Grid container spacing={4} width={isMobileL ? "100%" : "50%"}>
          <Grid xs={12}>
            <TextField
              label="Segment Name"
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Between"
              type="number"
              {...register("start", {
                setValueAs: setValueAsNumber,
              })}
              error={errors.start?.message}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="And"
              type="number"
              {...register("end", {
                setValueAs: setValueAsNumber,
              })}
              error={errors.end?.message}
            />
          </Grid>
          <Grid xs={4}>
            <Select
              id="select-time-unit"
              label="Time Unit"
              options={[
                {
                  label: "Minutes",
                  id: "minutes",
                },
                {
                  label: "Hours",
                  id: "hours",
                },
                {
                  label: "Days",
                  id: "days",
                },
              ]}
              getLabel={(option) => option.label}
              getValue={(option) => option.id}
              register={register("time_unit")}
              error={errors.time_unit?.message}
            />
          </Grid>
          <Grid xs={12}>
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Date and time of start"
                  {...field}
                  error={errors.start_date?.message}
                />
              )}
            />
          </Grid>
          <Grid xs={12}>
            <Select
              id="select-estimative-type"
              label="Estimative type"
              options={[
                {
                  label: "Reported by patient",
                  id: "reported",
                },
                {
                  label: "Measured by device",
                  id: "measured",
                },
                {
                  label: "Inferred by algorithm",
                  id: "inferred",
                },
              ]}
              getLabel={(option) => option.label}
              getValue={(option) => option.id}
              register={register("estimative_type")}
              error={errors.estimative_type?.message}
            />
          </Grid>
        </Grid>
        <FlexColumn
          width={isMobileL ? "100%" : "50%"}
          gap={4}
          justify="flex-start"
        >
          <RadioContainer>
            <Radio label="Acute" value="acute" {...register("pain_type")} />
            <Radio label="Chronic" value="chronic" {...register("pain_type")} />
          </RadioContainer>
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

const RadioContainer = styled(FlexColumn)``;

const Container = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;

  ${media.up.mobileL`
    flex-direction: column;
  `}
`;
