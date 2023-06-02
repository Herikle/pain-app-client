export type IRole = "doctor" | "veterinarian";

export type IMe = {
  _id: string;
  name: string;
  email: string;
  super: boolean;
  role?: IRole;
};

export type IPrompt = {
  prompt: string;
  attributes: any;
};
