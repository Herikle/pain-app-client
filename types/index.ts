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
  creator?: Omit<IMe, "super">;
  about?: string;
};

export type IEpisode = {
  _id: string;
  name: string;
  patient_id: string;
  creator_id: string;
  createdAt: string;
  updatedAt: string;
  location?: string;
  diagnosis?: string;
  comment?: string;
  start_date?: string;
  patient?: IPatient;
};

type ITrackPainType = "psychological" | "physical";

export type ITrack = {
  _id: string;
  name: string;
  pain_type: ITrackPainType;
  episode_id: string;
  comment?: string;
};

export type IIntervetion = {
  _id: string;
  name: string;
  datetime: string;
  dose: string;
  effective: boolean;
};

export type ISymptom = {
  _id: string;
  name: string;
  datetime: string;
};
