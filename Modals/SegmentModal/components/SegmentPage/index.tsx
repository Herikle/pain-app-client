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
import { setValueAsNumber } from "@utils/helpers/zodValidation";
import { CommonSegmentModalProps } from "../..";
import { media, useMatchMediaUp } from "@styles/media-query";
import { DateAndTimePicker } from "@components/DateAndTimePicker";

const SegmentPageSchema = z
  .object({
    name: z.string().optional(),
    start: z.number().nonnegative().optional(),
    end: z.number().nonnegative().optional(),
    time_unit: z.enum(["minutes", "hours", "days"]),
    start_date: z
      .date({
        errorMap: (issue) => {
          if (issue.code === "invalid_type") {
            return { message: "Date is incomplete. Please select a date" };
          }

          return { message: "Invalid date" };
        },
      })
      .optional()
      .nullable(),
    estimative_type: z
      .enum(["reported", "measured", "inferred", ""])
      .optional(),
    pain_type: z.enum(["acute", "chronic"]),
    comment: z.string().optional(),
  })
  .refine(
    (data) => {
      const { start, end } = data;
      return (start ?? 0) <= (end ?? 0);
    },
    {
      path: ["end"],
      message: "End must be greater than start",
    }
  );

export type SegmentPageForm = z.infer<typeof SegmentPageSchema>;

type Props = {
  segmentPageForm: SegmentPageForm;
} & CommonSegmentModalProps<SegmentPageForm>;

export const SegmentPage = ({
  segmentPageForm,
  onChange,
  onValidChange,
}: Props) => {
  const { register, formState, control, watch } = useForm<SegmentPageForm>({
    resolver: zodResolver(SegmentPageSchema),
    defaultValues: {
      ...segmentPageForm,
      estimative_type: segmentPageForm?.estimative_type ?? "",
      start_date: segmentPageForm?.start_date,
    },
    mode: "onChange",
  });

  const { errors, isValid, isDirty } = formState;

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  useEffect(() => {
    const subscription = watch((value) => {
      onChange({
        ...value,
        start: value.start ?? 0,
        end: value.end ?? 0,
      });
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
              label="Segment Name"
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Duration (min)"
              type="number"
              min={0}
              {...register("start", {
                setValueAs: setValueAsNumber,
                deps: ["end"],
              })}
              error={errors.start?.message}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Duration (max)"
              type="number"
              min={0}
              {...register("end", {
                setValueAs: setValueAsNumber,
                deps: ["start"],
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
              {...register("time_unit")}
              error={errors.time_unit?.message}
            />
          </Grid>
          <Grid xs={12}>
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <DateAndTimePicker
                  dateLabel="Start Date"
                  timeLabel="Start Time"
                  {...field}
                  error={errors.start_date?.message}
                />
              )}
            />
          </Grid>
          <Grid xs={12}>
            <Select
              id="select-estimative-type"
              label="How was duration estimated?"
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
              {...register("estimative_type")}
              error={errors.estimative_type?.message}
            />
          </Grid>
        </Grid>
        <FlexColumn
          width={isTablet ? "100%" : "50%"}
          gap={4}
          justify="flex-start"
        >
          <RadioContainer>
            <Radio label="Acute" value="acute" {...register("pain_type")} />
            <Radio label="Chronic" value="chronic" {...register("pain_type")} />
          </RadioContainer>
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

const RadioContainer = styled(FlexColumn)``;

const Container = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;

  ${media.up.tablet`
    flex-direction: column;
  `}
`;
