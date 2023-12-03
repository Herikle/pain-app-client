import { setValueAsNumber } from "@utils/helpers/zodValidation";
import { Section } from "../shared-style";
import { Input } from "./style";
import { z, zodResolver, useForm } from "@utils/helpers/form-validation";
import { PatternFormat } from "react-number-format";
import { theme } from "@styles/theme";
import { Controller } from "react-hook-form";

const parseNumber = (value: number | undefined) => {
  if (value === undefined) return "";
  return value;
};

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
  values?: SegmentValuesForm;
  onChange?: (data: onChangeValueProps) => void;
};

export const SegmentValues = ({
  readOnly,
  values,
  onChange,
}: ValuesSectionProps) => {
  const { getValues, control } = useForm<SegmentValuesForm>({
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

  return (
    <form onChange={onUpdate}>
      {valuesArray.map((value) => (
        <Section key={value}>
          {readOnly ? (
            <Input
              value={values?.[value] ?? ""}
              disabled={true}
              suffix="%"
              style={{
                color: theme.pain_level_colors[value],
                pointerEvents: "none",
              }}
            />
          ) : (
            <Controller
              control={control}
              name={value}
              render={({ field }) => (
                <Input
                  value={field.value}
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
              )}
            />
          )}
        </Section>
      ))}
    </form>
  );
};
