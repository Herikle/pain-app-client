import { Section } from "../shared-style";
import { Input } from "./style";
import { z, zodResolver, useForm } from "@utils/helpers/form-validation";
import { theme } from "@styles/theme";
import { Controller } from "react-hook-form";
import { Text } from "@components/Text";
import { FlexRow } from "@design-components/Flex";
import { ISegment } from "types";
import {
  convertNumberToFixed,
  convertTimeToHours,
  getTimeUnitAbbreviation,
} from "@utils/helpers/segmentHelpers";
import { Trash } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { transparentize } from "polished";

export const SegmentValuesSchema = z
  .object({
    excruciating: z
      .number()
      .nonnegative("Excruciating must be a positive number")
      .optional()
      .nullable(),
    disabling: z
      .number()
      .nonnegative("Disabling must be a positive number")
      .optional()
      .nullable(),
    hurful: z
      .number()
      .nonnegative("Hurful must be a positive number")
      .optional()
      .nullable(),
    annoying: z
      .number()
      .nonnegative("Annoying must be a positive number")
      .optional()
      .nullable(),
    no_pain: z
      .number()
      .nonnegative("No pain must be a positive number")
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      const sum = Object.values(data).reduce(
        (acc: number, curr: number | undefined | null) => acc + (curr ?? 0),
        0
      );
      return (sum ?? 0) <= 100;
    },
    {
      message: "The sum of all values must be less or equal to 100",
      params: {
        id: "MAX_SUM",
      },
    }
  );

type SegmentValuesForm = z.infer<typeof SegmentValuesSchema>;

const valuesArray: (keyof SegmentValuesForm)[] = [
  "excruciating",
  "disabling",
  "hurful",
  "annoying",
  "no_pain",
];

export type onChangeValueProps = {
  values: SegmentValuesForm;
  hasError: boolean;
  errors: string[];
};

type ValuesSectionProps = {
  readOnly: boolean;
  segmentTime: {
    min: number | undefined;
    max: number | undefined;
  };
  values: SegmentValuesForm | undefined;
  onChange?: (data: onChangeValueProps) => void;
  cumulativePainMode: boolean;
  timeUnit: ISegment["time_unit"];
};

export const SegmentValues = ({
  readOnly,
  values,
  onChange,
  segmentTime,
  cumulativePainMode,
  timeUnit,
}: ValuesSectionProps) => {
  const { getValues, control, reset } = useForm<SegmentValuesForm>({
    resolver: zodResolver(SegmentValuesSchema),
    mode: "onChange",
    defaultValues: {
      annoying: values?.annoying,
      disabling: values?.disabling,
      excruciating: values?.excruciating,
      hurful: values?.hurful,
      no_pain: values?.no_pain,
    },
  });

  const onUpdate = () => {
    const values = getValues();
    const result = SegmentValuesSchema.safeParse(values);

    let errors: string[] = [];

    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      errors = messages;
    }

    onChange?.({
      values,
      hasError: !result.success,
      errors,
    });
  };

  const getRawValue = (value: keyof SegmentValuesForm) => {
    return values?.[value] ? `${values?.[value]}%` : "";
  };

  const getCumulativeValue = (value: keyof SegmentValuesForm) => {
    const percentValue = values?.[value] ?? 0;

    if (percentValue === 0) return "";

    const min = convertTimeToHours(segmentTime.min, timeUnit);
    const max = convertTimeToHours(segmentTime.max, timeUnit);
    if (min === 0 && max === 0) return "";
    const percentage = percentValue / 100;
    const duration_min = min * percentage;
    const duration_max = max * percentage;
    return `${convertNumberToFixed(duration_min)} - ${convertNumberToFixed(
      duration_max
    )} ${getTimeUnitAbbreviation("hours")}`;
  };

  const clearValues = () => {
    reset({
      annoying: null,
      disabling: null,
      excruciating: null,
      hurful: null,
      no_pain: null,
    });

    onUpdate();
  };

  return (
    <>
      <form onChange={onUpdate}>
        {valuesArray.map((value) => (
          <Section key={value}>
            {readOnly ? (
              <FlexRow width="100%" height="100%">
                <Text
                  variant="body1Bold"
                  align="center"
                  customColor={theme.pain_level_colors[value]}
                >
                  {cumulativePainMode
                    ? getCumulativeValue(value)
                    : getRawValue(value)}
                </Text>
              </FlexRow>
            ) : (
              <Controller
                control={control}
                name={value}
                render={({ field }) => {
                  return (
                    <Input
                      value={field.value ?? ""}
                      onValueChange={(value) => {
                        field.onChange(value.floatValue ?? null);
                      }}
                      onBlur={field.onBlur}
                      getInputRef={field.ref}
                      suffix="%"
                      style={{
                        color: theme.pain_level_colors[value],
                      }}
                    />
                  );
                }}
              />
            )}
          </Section>
        ))}
      </form>
      {!readOnly && (
        <>
          <Clear id="clear-values">
            <Trash
              size={16}
              color={theme.colors.pure_black}
              onClick={clearValues}
            />
          </Clear>
          <Tooltip anchorSelect="#clear-values">Clear values</Tooltip>
        </>
      )}
    </>
  );
};

const Clear = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0;
  background-color: ${theme.colors.hover_state};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  cursor: pointer;
  transform: translate(calc(100% + 0.5rem), -100%);
  box-shadow: 0px 4px 4px 0px ${transparentize(0.75, theme.colors.pure_black)};
`;
