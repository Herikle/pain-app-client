import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import {
  CSSObject,
  DefaultTheme,
  FlattenInterpolation,
  Interpolation,
  InterpolationFunction,
  SimpleInterpolation,
  ThemedStyledProps,
  css,
} from "styled-components";

const breakpoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  fullHD: 1920,
  fourK: 2560,
};

type BreakPointsType = {
  /** 320 */
  mobileS: MediaFunction;
  /** 375 */
  mobileM: MediaFunction;
  /** 425 */
  mobileL: MediaFunction;
  /** 768 */
  tablet: MediaFunction;
  /** 1024 */
  laptop: MediaFunction;
  /** 1440 */
  laptopL: MediaFunction;
  /** 1920 */
  fullHD: MediaFunction;
  /** 2560 */
  fourK: MediaFunction;
};

type MediaType = {
  up: BreakPointsType;
  down: BreakPointsType;
};

export const media: MediaType = {
  down: (Object.keys(breakpoints) as Array<keyof typeof breakpoints>).reduce(
    (acc, label) => {
      acc[label] = (
        first: TemplateStringsArray | CSSObject,
        ...interpolations: SimpleInterpolation[]
      ) => css`
        @media (min-width: ${breakpoints[label]}px) {
          ${css(first, ...interpolations)}
        }
      `;
      return acc;
    },
    {} as {
      [key in keyof typeof breakpoints]: MediaFunction;
    }
  ),
  up: (Object.keys(breakpoints) as Array<keyof typeof breakpoints>).reduce(
    (acc, label) => {
      acc[label] = (
        first: TemplateStringsArray | CSSObject,
        ...interpolations: SimpleInterpolation[]
      ) => css`
        @media (max-width: ${breakpoints[label]}px) {
          ${css(first, ...interpolations)}
        }
      `;
      return acc;
    },
    {} as {
      [key in keyof typeof breakpoints]: MediaFunction;
    }
  ),
};

type MediaFunction = <P extends object>(
  first:
    | TemplateStringsArray
    | CSSObject
    | InterpolationFunction<ThemedStyledProps<P, DefaultTheme>>,
  ...interpolations: Array<Interpolation<ThemedStyledProps<P, DefaultTheme>>>
) => FlattenInterpolation<ThemedStyledProps<P, DefaultTheme>>;

export const useMatchMediaUp = (breakpoint: keyof typeof breakpoints) => {
  const up = useMediaQuery(`(max-width: ${breakpoints[breakpoint]}px)`);

  return up;
};

export const useMatchMediaDown = (breakpoint: keyof typeof breakpoints) => {
  const down = useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);

  return down;
};
