const LightThemeColors = {
  primary: "#005697",
  hover_state: "#D9D9D9",
  cta: "#FFA644",
  cta_secondary: "#FFC172",
  disabled_color: "#ABC6DB",
  font_color: "#1E1E1E",
  secondary_color: "#007EDD",
  secondary_font: "#80A7C5",
  pure_white: "#FFFFFF",
  text_switched: "#949494",
};

const LightThemeHover = {
  primary: LightThemeColors.secondary_color,
  cta: LightThemeColors.cta_secondary,
};

export const theme = {
  colors: LightThemeColors,
  hover_state: LightThemeHover,
};

export type ThemeColors = keyof typeof LightThemeColors;

export type ButtonColors = "primary" | "cta";
