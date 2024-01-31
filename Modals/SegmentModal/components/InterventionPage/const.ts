export type Doses =
  | "analgesics"
  | "local-anesthetics"
  | "physical-therapy"
  | "corrective-surgery"
  | "dietary-changes"
  | "others";

export type DoseObject = {
  value: Doses;
  label: string;
};

export const ALL_DOSES: DoseObject[] = [
  {
    value: "analgesics",
    label: "Analgesics",
  },
  {
    value: "local-anesthetics",
    label: "Local Anesthetics",
  },
  {
    value: "physical-therapy",
    label: "Physical Therapy",
  },
  {
    value: "corrective-surgery",
    label: "Corrective Surgery",
  },
  {
    value: "dietary-changes",
    label: "Dietary Changes",
  },
  {
    value: "others",
    label: "Others",
  },
];
