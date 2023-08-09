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
    iconPath: IconsPath.texture.stretching,
    label: "Stretching",
    description: "twist, tear, rip, etc.",
  },
  {
    id: "stinging",
    iconPath: IconsPath.texture.stinging,
    label: "Stinging",
    description: "needles,cut,cold,itch",
  },
  {
    id: "burning",
    iconPath: IconsPath.texture.burning,
    label: "Burning",
    description: "acid, caustic, scolding",
  },
  {
    id: "pressing",
    iconPath: IconsPath.texture.pressing,
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
    iconPath: IconsPath.depth.muscular,
    label: "Muscular",
    description: "from the muscles",
  },
  {
    id: "visceral",
    iconPath: IconsPath.depth.visceral,
    label: "Visceral",
    description: "from the organs",
  },
  {
    id: "superficial",
    iconPath: IconsPath.depth.superficial,
    label: "Superficial",
    description: "from the skin",
  },
  {
    id: "bone",
    iconPath: IconsPath.depth.bone,
    label: "Bone",
    description: "from bones, or joints",
  },
];
