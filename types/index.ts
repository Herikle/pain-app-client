import { DrawObject } from "@components/Paint";

export type Meta = {
  current_count: number;
  current_page: number;
  items_per_page: number;
  total_count: number;
  total_pages: number;
};

export type IRole = "doctor" | "veterinarian";

export type CommonKeyStringPair = {
  [key: string]: string;
};

export type CommonKeyBooleanPair = {
  [key: string]: boolean;
};

export type IMe = {
  _id: string;
  name: string;
  email: string;
  super: boolean;
  createdAt: string;
  updatedAt: string;
  noPassword: boolean;
  role?: IRole;
};

export type IPromptOptions = {
  frequency_penalty?: number;
  presence_penalty?: number;
  temperature?: number;
  top_p?: number;
};

export const EmptyAttributesConfig = {
  label: {},
  helperText: {},
  placeholder: {},
  isTextArea: {},
  isRequired: {},
};

export type IAttributesConfig = {
  label: CommonKeyStringPair;
  placeholder: CommonKeyStringPair;
  helperText: CommonKeyStringPair;
  isTextArea: CommonKeyBooleanPair;
  isRequired: CommonKeyBooleanPair;
};

export type IPrompt = {
  _id: string;
  title: string;
  prompt: string;
  options: IPromptOptions;
  attributes: any;
  attributesConfig?: IAttributesConfig;
  createdAt: string;
  updatedAt: string;
  isMain?: boolean;
};

export type IPatient = {
  _id: string;
  name: string;
  birth_date: string;
  creator_id: string;
  createdAt: string;
  updatedAt: string;
  type: "human" | "animal";
  location?: string;
  common_name?: string;
  scientific_name?: string;
  production_system?: string;
  life_fate?: string;
  episodes_count?: number;
  creator?: Omit<IMe, "super">;
  about?: string;
};

export type IIntervetion = {
  _id: string;
  name: string;
  effective: boolean;
  dose?: string;
  datetime?: string;
  observation?: string;
  createdAt: string;
  updatedAt: string;
};

export type ISymptom = {
  _id: string;
  name: string;
  datetime?: string;
  observation?: string;
  createdAt: string;
  updatedAt: string;
};

type IIntensityType = "draw" | "values";
export type ISegmentTimeUnit = "minutes" | "hours" | "days";
type ISegmentEstimativeType = "reported" | "measured" | "inferred";
type ISegmentPainType = "acute" | "chronic";

export type ISegmentValues = {
  excruciating?: number;
  disabling?: number;
  hurful?: number;
  annoying?: number;
};

export type ISegmentIntensities = {
  type: IIntensityType;
  draw?: DrawObject[];
  values?: ISegmentValues;
  justification?: string;
};

export const qualityTextureEnum = [
  "stretching",
  "stinging",
  "burning",
  "pressing",
] as const;

export type IQualityTexture = (typeof qualityTextureEnum)[number];

export const qualityDepthEnum = [
  "muscular",
  "visceral",
  "superficial",
  "bone",
] as const;

export type IQualityDepth = (typeof qualityDepthEnum)[number];

export type ISegmentQuality = {
  texture?: IQualityTexture;
  depth?: IQualityDepth;
  anatomy?: string;
  comment?: string;
};

export type ISegment = {
  _id: string;
  name?: string;
  start?: number;
  end?: number;
  time_unit: ISegmentTimeUnit;
  start_date?: Date;
  estimative_type: ISegmentEstimativeType;
  comment?: string;
  pain_type: ISegmentPainType;
  intensities: ISegmentIntensities;
  quality?: ISegmentQuality;
  interventions: IIntervetion[];
  track_id: string;
  symptoms: ISymptom[];
  createdAt: string;
  updatedAt: string;
};

type ITrackPainType = "psychological" | "physical";

export type ITrack = {
  _id: string;
  name: string;
  pain_type: ITrackPainType;
  episode_id: string;
  segments?: ISegment[];
  comment?: string;
  createdAt: string;
  updatedAt: string;
};

export type IEpisode = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  tracks_count?: number;
  location?: string;
  diagnosis?: string;
  comment?: string;
  patient_id?: string;
  start_date?: string;
  creator_id?: string;
  patient?: IPatient;
};
