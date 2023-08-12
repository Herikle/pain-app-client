import { Radio } from "@components/Radio";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { SegmentsTitleComponent } from "@components/Track";
import { Segment } from "@components/Track/components/Segment";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ISegment, ISegmentValues } from "types";
import { z, zodResolver, useForm } from "@utils/helpers/form-validation";
import { CommonSegmentModalProps } from "../..";
import {
  SegmentValuesSchema,
  onChangeValueProps,
} from "@components/Track/components/Segment/components/SegmentValues";
import { DrawObject } from "@components/Paint";

const IntensitiesPageSchema = z.object({
  type: z.enum(["draw", "values"]),
  justification: z.string().optional(),
  values: SegmentValuesSchema.optional(),
  draw: z.any().optional(),
});

export type IntensitiesPageForm = z.infer<typeof IntensitiesPageSchema>;

type Props = {
  intensities: IntensitiesPageForm;
  segment: ISegment;
} & CommonSegmentModalProps<IntensitiesPageForm>;

export const IntensitiesPage = ({
  intensities,
  segment,
  onChange,
  onValidChange,
}: Props) => {
  const { register, getValues, formState, watch, setValue } =
    useForm<IntensitiesPageForm>({
      resolver: zodResolver(IntensitiesPageSchema),
      defaultValues: {
        justification: intensities.justification ?? "",
        type: intensities.type,
        values: intensities.values,
        draw: intensities.draw,
      },
      mode: "onChange",
    });

  const [segmentErrors, setSegmentErrors] = useState<string[]>([]);

  const [hasError, setHasError] = useState(false);

  const onUpdateSegmentValues = (data: onChangeValueProps) => {
    if (data.hasError) {
      setHasError(true);
      setSegmentErrors(data.errors);
    } else {
      setHasError(false);
      setSegmentErrors([]);
    }

    setValue("values", data.values);
  };

  const onUpdateSegmentDraw = (data: DrawObject[]) => {
    setValue("draw", data);
    onUpdate();
  };

  const onUpdate = () => {
    onChange(getValues());
  };

  const { errors, isValid } = formState;

  useEffect(() => {
    onValidChange(isValid && !hasError);
  }, [isValid, onValidChange, hasError]);

  return (
    <form onChange={onUpdate}>
      <Container gap={3} align="flex-start">
        <FlexRow gap={6} pl={3}>
          <Radio label="Draw" value="draw" {...register("type")} />
          <Radio label="Percentage" value="values" {...register("type")} />
        </FlexRow>
        <FlexColumn width="100%">
          <FlexRow gap={4}>
            <FlexRow gap={0} justify="flex-start">
              <SegmentsTitleComponent />
              <Segment
                segment={{
                  ...segment,
                  intensities: {
                    ...intensities,
                    type: watch("type"),
                  },
                }}
                hasDraw
                backgroundColor={theme.colors.pastel}
                onChangeValues={onUpdateSegmentValues}
                onChangeDraw={onUpdateSegmentDraw}
                isSolitary
              />
            </FlexRow>
            <TextArea
              fullWidth
              label="Justification"
              placeholder="Write something"
              minRows={15}
              maxRows={15}
              {...register("justification")}
              error={errors.justification?.message}
            />
          </FlexRow>
          {watch("type") === "draw" ? (
            <Text maxWidth="300px">
              Tip: try to measure your pain drawing a line with the mouse
              between the indicators.
            </Text>
          ) : (
            <>
              {segmentErrors?.map((error) => (
                <Text variant="body2" key={error} color="dark_red_danger">
                  {error}
                </Text>
              ))}
            </>
          )}
        </FlexColumn>
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)``;
