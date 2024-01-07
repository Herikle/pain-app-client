import { Radio } from "@components/Radio";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { SegmentsTitleComponent } from "@components/Track";
import { Segment } from "@components/Track/components/Segment";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ISegment, ISegmentJustification, ISegmentValues } from "types";
import { z, zodResolver, useForm } from "@utils/helpers/form-validation";
import { CommonSegmentModalProps } from "../..";
import {
  SegmentValuesSchema,
  onChangeValueProps,
} from "@components/Track/components/Segment/components/SegmentValues";
import { DrawObject } from "@components/Paint";
import { media } from "@styles/media-query";
import { JustificationList } from "./components/JustificationList";

const IntensitiesPageSchema = z.object({
  type: z.enum(["draw", "values"]),
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

  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, onChange]);

  const { errors, isValid } = formState;

  useEffect(() => {
    onValidChange(isValid && !hasError);
  }, [isValid, onValidChange, hasError]);

  return (
    <form>
      <Container>
        <FlexColumn>
          <FlexRow gap={6} pl={3}>
            <Radio label="Draw" value="draw" {...register("type")} />
            <Radio label="Percentage" value="values" {...register("type")} />
          </FlexRow>
          <FlexColumn width="100%">
            <DrawAndJustificationContainer>
              <FlexRow gap={0}>
                <SegmentsTitleComponent removeExtraSpace />
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
                  hideSegmentName
                />
              </FlexRow>
            </DrawAndJustificationContainer>
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
        </FlexColumn>
        <JustificationList segment_id={segment._id} />
      </Container>
    </form>
  );
};

const DrawAndJustificationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-top: 2rem;
  ${media.up.tablet`
    flex-direction: column;
  `}
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6rem;
  ${media.up.tablet`
    flex-direction: column;
  `}
`;
