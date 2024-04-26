import { Doses } from "@Modals/SegmentModal/components/InterventionPage/const";
import {
  IEpisode,
  IIntervetion,
  IJustificationType,
  IQualityDepth,
  IQualityTexture,
  ISegment,
  ISegmentEstimativeType,
  ISegmentIntensities,
  ISegmentPainType,
  ISegmentQuality,
  ISegmentTimeUnit,
  ISymptom,
  ITrackPainType,
  ImportEpisodeStructure,
} from "types";

import { z } from "@utils/helpers/form-validation";

const checkIfDateIsValid = (date: string | undefined | null) => {
  if (!date) {
    return true;
  }

  const dateObject = new Date(date);
  if (!dateObject.getTime()) {
    return false;
  }

  return true;
};

const checkRanking = (value: number | undefined) => {
  if (!value) {
    return true;
  }

  if (value < 0 || value > 4) {
    return false;
  }

  return true;
};

const justificationSchema = z.object({
  title: z.string().min(1),
  type_of_evidence: z
    .custom<IJustificationType>()
    .optional()
    .nullable()
    .refine((type_of_evidence) => {
      if (!type_of_evidence) {
        return true;
      }

      const allTypes: IJustificationType[] = [
        "behavioral",
        "neurological",
        "pharmacological",
        "physiological",
        "evolutionary",
      ];

      if (!allTypes.includes(type_of_evidence)) {
        return false;
      }

      return true;
    }),
  description: z.string().optional().nullable(),
  sources: z.string().optional().nullable(),
  ranking: z.object({
    excruciating: z.number().optional().nullable().refine(checkRanking, {
      message: "Invalid ranking value",
    }),
    disabling: z.number().optional().nullable().refine(checkRanking, {
      message: "Invalid ranking value",
    }),
    hurful: z.number().optional().nullable().refine(checkRanking, {
      message: "Invalid ranking value",
    }),
    annoying: z.number().optional().nullable().refine(checkRanking, {
      message: "Invalid ranking value",
    }),
    no_pain: z.number().optional().nullable().refine(checkRanking, {
      message: "Invalid ranking value",
    }),
  }),
});

const segmentSchema = z.object({
  estimative_type: z
    .custom<ISegmentEstimativeType>()
    .optional()
    .nullable()
    .refine(
      (estimative_type) => {
        if (!estimative_type) {
          return true;
        }

        const allTypes: ISegmentEstimativeType[] = [
          "inferred",
          "measured",
          "reported",
          "inferred_from_evidence",
        ];

        if (!allTypes.includes(estimative_type)) {
          return false;
        }

        return true;
      },
      {
        message:
          "Invalid estimative type, must be inferred, measured or reported",
      }
    ),
  start_date: z.string().optional().nullable().refine(checkIfDateIsValid, {
    message: "Invalid date format",
  }),
  end: z.number().optional().nullable(),
  start: z.number().optional().nullable(),
  intensities: z.object({
    min: z.number().optional().nullable(),
    max: z.number().optional().nullable(),
    avg: z.number().optional().nullable(),
  }),
  comment: z.string().optional().nullable(),
  interventions: z.array(
    z.object({
      name: z.string().min(1),
      effective: z.boolean().optional().nullable(),
      dose: z
        .custom<Doses>()
        .optional()
        .nullable()
        .refine((dose) => {
          if (!dose) {
            return true;
          }

          const allTypes: Doses[] = [
            "analgesics",
            "local-anesthetics",
            "physical-therapy",
            "corrective-surgery",
            "dietary-changes",
            "others",
          ];

          if (!allTypes.includes(dose)) {
            return false;
          }

          return true;
        }),
      datetime: z.string().optional().nullable().refine(checkIfDateIsValid, {
        message: "Invalid date format",
      }),
      observation: z.string().optional().nullable(),
    })
  ),
  pain_type: z
    .custom<ISegmentPainType>()
    .optional()
    .nullable()
    .refine(
      (pain_type) => {
        if (!pain_type) {
          return true;
        }

        const allTypes: ISegmentPainType[] = ["acute", "chronic"];

        if (!allTypes.includes(pain_type)) {
          return false;
        }

        return true;
      },
      {
        message: "Invalid pain type, must be acute or chronic",
      }
    ),
  symptoms: z.array(
    z.object({
      name: z.string().min(1),
      datetime: z.string().optional().nullable().refine(checkIfDateIsValid, {
        message: "Invalid date format",
      }),
      observation: z.string().optional().nullable(),
    })
  ),
  time_unit: z
    .custom<ISegmentTimeUnit>()
    .optional()
    .nullable()
    .refine(
      (time_unit) => {
        if (!time_unit) {
          return true;
        }

        const allTypes: ISegmentTimeUnit[] = ["days", "hours", "minutes"];

        if (!allTypes.includes(time_unit)) {
          return false;
        }

        return true;
      },
      {
        message: "Invalid time unit, must be days, hours or minutes",
      }
    ),
  name: z.string().optional().nullable(),
  quality: z
    .object({
      texture: z
        .custom<IQualityTexture>()
        .optional()
        .nullable()
        .refine(
          (texture) => {
            if (!texture) {
              return true;
            }

            const allTypes: IQualityTexture[] = [
              "stretching",
              "stinging",
              "burning",
              "pressing",
            ];

            if (!allTypes.includes(texture)) {
              return false;
            }

            return true;
          },
          {
            message:
              "Invalid texture type, must be stretching, stinging, burning or pressing",
          }
        ),
      depth: z
        .custom<IQualityDepth>()
        .optional()
        .nullable()
        .refine(
          (depth) => {
            if (!depth) {
              return true;
            }

            const allTypes: IQualityDepth[] = [
              "muscular",
              "visceral",
              "superficial",
              "bone",
            ];

            if (!allTypes.includes(depth)) {
              return false;
            }

            return true;
          },
          {
            message:
              "Invalid depth type, must be muscular, visceral, superficial or bone",
          }
        ),
      anatomy: z.string().optional().nullable(),
      comment: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  justifications: z.array(justificationSchema).optional().nullable(),
});

const trackSchema = z.object({
  name: z.string().min(1),
  pain_type: z
    .custom<ITrackPainType>()
    .optional()
    .nullable()
    .refine(
      (pain_type) => {
        if (!pain_type) {
          return true;
        }

        const allTypes: ITrackPainType[] = ["psychological", "physical"];

        if (!allTypes.includes(pain_type)) {
          return false;
        }

        return true;
      },
      {
        message: "Invalid pain type, must be psychological or physical",
      }
    ),
  comment: z.string().optional().nullable(),
  segments: z.array(segmentSchema).optional().nullable(),
});

const importedEpisodeSchema = z.object({
  name: z.string().min(1),
  location: z.string().optional().nullable(),
  diagnosis: z.string().optional().nullable(),
  start_date: z.string().optional().nullable().refine(checkIfDateIsValid, {
    message: "Invalid date format",
  }),
  comment: z.string().optional().nullable(),
  tracks: z.array(trackSchema).optional().nullable(),
});

export const checkValidity = (episode: ImportEpisodeStructure) => {
  const validation = importedEpisodeSchema.safeParse(episode);

  return validation;
};
