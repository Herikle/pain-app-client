import { Section } from "../shared-style";
import { Input } from "./style";
import { z, zodResolver, useForm } from "@utils/helpers/form-validation";
import { useEffect } from "react";

const parseNumber = (value: number | undefined) => {
  if (value === undefined) return 0;
  return value;
};

export const SegmentValuesSchema = z
  .object({
    excruciating: z.number().nonnegative().optional(),
    disabling: z.number().nonnegative().optional(),
    hurful: z.number().nonnegative().optional(),
    annoying: z.number().nonnegative().optional(),
  })
  .partial()
  .refine(
    (data) => {
      const sum = Object.values(data).reduce((acc, curr) => acc + curr, 0);
      return sum <= 100;
    },
    {
      message: "The sum of all values must be less than 100",
      path: ["values"],
    }
  );

type SegmentValuesForm = z.infer<typeof SegmentValuesSchema>;

const valuesArray: (keyof SegmentValuesForm)[] = [
  "excruciating",
  "disabling",
  "hurful",
  "annoying",
];

type ValuesSectionProps = {
  readOnly: boolean;
  values?: SegmentValuesForm;
};

export const SegmentValues = ({ readOnly, values }: ValuesSectionProps) => {
  const { register, getValues, formState, watch } = useForm<SegmentValuesForm>({
    resolver: zodResolver(SegmentValuesSchema),
    mode: "onChange",
    defaultValues: {
      annoying: parseNumber(values?.annoying),
      disabling: parseNumber(values?.disabling),
      excruciating: parseNumber(values?.excruciating),
      hurful: parseNumber(values?.hurful),
    },
  });

  const { errors } = formState;

  return (
    <>
      {valuesArray.map((value) => (
        <Section key={value}>
          <Input
            readOnly={readOnly}
            {...register(value, {
              valueAsNumber: true,
            })}
          />
        </Section>
      ))}
    </>
  );
};
