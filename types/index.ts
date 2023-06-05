export type Meta = {
  current_count: number;
  current_page: number;
  items_per_page: number;
  total_count: number;
  total_pages: number;
};

export type IRole = "doctor" | "veterinarian";

export type IMe = {
  _id: string;
  name: string;
  email: string;
  super: boolean;
  createdAt: string;
  updatedAt: string;
  role?: IRole;
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

export type IPrompt = {
  prompt: string;
  attributes: any;
  createdAt: string;
  updatedAt: string;
};
