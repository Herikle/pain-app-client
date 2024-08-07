import { DrawObject } from "@components/Paint";
import { Doses } from "@Modals/SegmentModal/components/InterventionPage/const";

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
  name: string | undefined;
  birth_date: string;
  creator_id: string;
  createdAt: string;
  updatedAt: string;
  type: "human" | "animal";
  discussions_count?: number;
  bookmarked?: number;
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
  dose?: Doses | null;
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
export type ISegmentEstimativeType =
  | "reported"
  | "measured"
  | "inferred"
  | "inferred_from_evidence"
  | "";
export type ISegmentPainType = "acute" | "chronic";

export type ISegmentValues = {
  excruciating?: number | null;
  disabling?: number | null;
  hurful?: number | null;
  annoying?: number | null;
  no_pain?: number | null;
};

export type IJustificationType =
  | "behavioral"
  | "neurological"
  | "physiological"
  | "pharmacological"
  | "evolutionary";

export type ISegmentJustification = {
  _id: string;
  title: string;
  type_of_evidence: IJustificationType | undefined;
  description: string;
  sources: string;
  ranking: {
    excruciating: number;
    disabling: number;
    hurful: number;
    annoying: number;
    no_pain: number;
  };
  segment_id: string;
};

export type ISegmentIntensities = {
  type: IIntensityType;
  draw?: DrawObject[];
  values?: ISegmentValues;
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
  texture?: IQualityTexture | null;
  depth?: IQualityDepth | null;
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

export type ITrackPainType = "psychological" | "physical";

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
  discussions_count?: number;
  tracks_count?: number;
  location?: string;
  diagnosis?: string;
  comment?: string;
  patient_id?: string;
  start_date?: string;
  creator_id?: string;
  patient?: IPatient;
};

type ImportSegmentJustificationStructure = Omit<
  ISegmentJustification,
  "segment_id" | "_id"
>;

type ImportSegmentStructure = Omit<ISegment, "track_id" | "_id"> & {
  justifications?: ImportSegmentJustificationStructure[];
};

type ImportTrackStructure = Omit<ITrack, "episode_id" | "_id"> & {
  segments?: ImportSegmentStructure[];
};

export type ImportEpisodeStructure = Omit<
  IEpisode,
  "patient_id" | "creator_id" | "_id"
> & {
  tracks?: ImportTrackStructure[];
};
