import { css } from "styled-components";

const LightThemeColors = {
  primary: "#005697",
  hover_state: "#D9D9D9",
  cta: "#FFA644",
  cta_secondary: "#CF8839",
  disabled_color: "#ABC6DB",
  font_color: "#1E1E1E",
  secondary_color: "#007EDD",
  secondary_font: "#80A7C5",
  pure_white: "#FFFFFF",
  pure_black: "#000000",
  text_switched: "#949494",
  light_grey: "#B7B7B7",
  medium_grey: "#838383",
  pastel_green: "#92E3A9",
};

const LightThemeHover = {
  primary: LightThemeColors.secondary_color,
  cta: LightThemeColors.cta_secondary,
  font_color: LightThemeColors.pure_black,
};

export const theme = {
  colors: LightThemeColors,
  hover_state: LightThemeHover,
};

export const LightScrollBar = css`
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0.25rem;
    background-color: ${theme.colors.light_grey};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.medium_grey};
    border-radius: 0.25rem;
  }
`;

export type ThemeColors = keyof typeof LightThemeColors;

export type ButtonColors = "primary" | "cta" | "font_color";
