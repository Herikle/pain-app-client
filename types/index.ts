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

export type IPrompt = {
  _id: string;
  title: string;
  prompt: string;
  options: IPromptOptions;
  attributes: any;
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
