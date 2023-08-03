import { IconsPath } from "@utils/icons";
import { IQualityDepth, IQualityTexture } from "types";

type ITexture = {
  id: IQualityTexture;
  iconPath: string;
  label: string;
  description: string;
};

export const textures: ITexture[] = [
  {
    id: "stretching",
    iconPath: IconsPath.texture.Stretching,
    label: "Stretching",
    description: "twist, tear, rip, etc.",
  },
  {
    id: "stinging",
    iconPath: IconsPath.texture.Stinging,
    label: "Stinging",
    description: "needles,cut,cold,itch",
  },
  {
    id: "burning",
    iconPath: IconsPath.texture.Burning,
    label: "Burning",
    description: "acid, caustic, scolding",
  },
  {
    id: "pressing",
    iconPath: IconsPath.texture.Pressing,
    label: "Pressing",
    description: "crushing, squeezing, tight",
  },
];

type IDepth = {
  id: IQualityDepth;
  iconPath: string;
  label: string;
  description: string;
};

export const depths: IDepth[] = [
  {
    id: "muscular",
    iconPath: IconsPath.depth.Muscular,
    label: "Muscular",
    description: "from the muscles",
  },
  {
    id: "visceral",
    iconPath: IconsPath.depth.Visceral,
    label: "Visceral",
    description: "from the organs",
  },
  {
    id: "superficial",
    iconPath: IconsPath.depth.Superficial,
    label: "Superficial",
    description: "from the skin",
  },
  {
    id: "bone",
    iconPath: IconsPath.depth.Bone,
    label: "Bone",
    description: "from bones, or joints",
  },
];
