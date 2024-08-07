import React, { useMemo, useState } from "react";
import { Eye, EyeClosed, Question } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";
import styled, { CSSProperties, css } from "styled-components";
import { Text, TextVariant } from "@components/Text";
import { theme } from "@styles/theme";
import { TooltipContent } from "@components/TooltipContent";

type LabelOptions = {
  textVariant?: TextVariant;
  fontWeight?: CSSProperties["fontWeight"];
};

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: React.ReactNode;
  fullWidth?: boolean;
  width?: string;
  error?: string;
  helperText?: string;
  noPadding?: boolean;
  inputSize?: "small" | "medium" | "large";
  noBorder?: boolean;
  labelOptions?: LabelOptions;
}

export const TextField = React.forwardRef(
  (
    {
      label,
      fullWidth,
      width,
      error,
      helperText,
      noPadding,
      inputSize,
      noBorder,
      labelOptions,
      ...rest
    }: Props,
    ref: any
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const labelIsParsableString = useMemo(() => {
      if (!label) return false;

      const parsableStringValues = ["string", "number", "boolean"];

      return parsableStringValues.includes(typeof label);
    }, [label]);

    return (
      <Container $fullWidth={fullWidth} $width={width}>
        {label && (
          <Label htmlFor={rest?.id}>
            {labelIsParsableString ? (
              <Text
                variant={labelOptions?.textVariant ?? "body2Bold"}
                whiteSpace="nowrap"
                fontWeight={labelOptions?.fontWeight}
              >
                {label}
              </Text>
            ) : (
              label
            )}
            {helperText && (
              <TooltipContent tooltip={helperText} noArrow theme="light">
                <Question size={16} weight="fill" />
              </TooltipContent>
            )}
          </Label>
        )}
        {rest.type === "password" ? (
          <InputContainer>
            <Input
              $noPadding={noPadding}
              $inputSize={inputSize}
              $noBorder={noBorder}
              ref={ref}
              {...rest}
              type={showPassword ? "text" : "password"}
            />
            <EyeContainer
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosed
                  size={22}
                  weight="bold"
                  color={theme.colors.secondary_font}
                />
              ) : (
                <Eye
                  size={22}
                  weight="bold"
                  color={theme.colors.secondary_font}
                />
              )}
            </EyeContainer>
          </InputContainer>
        ) : (
          <Input
            $noBorder={noBorder}
            $noPadding={noPadding}
            $inputSize={inputSize}
            ref={ref}
            {...rest}
          />
        )}

        {error && (
          <Text variant="caption" color="red_danger">
            {error}
          </Text>
        )}
      </Container>
    );
  }
);

TextField.displayName = "TextField";

const Label = styled.label`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const TooltipWrapper = styled.div`
  & .react-tooltip {
    background-color: ${theme.colors.pure_white};
    border: 1px solid ${theme.colors.font_color};
    opacity: 1 !important;
  }
`;

const TooltipContainer = styled.div`
  max-width: 300px;
`;

const TrackCSS = css`
  background: ${theme.colors.light_grey};
  height: 0.5rem;
  border-radius: 4px;
`;

const SmallTrackCss = css`
  background: ${theme.colors.light_grey};
  height: 2px;
  border-radius: 4px;
`;

const ThumbCSS = css`
  -webkit-appearance: none;
  appearance: none;
  margin-top: -12px; /* Centers thumb on the track */
  background-color: ${theme.colors.pure_black};
  height: 2rem;
  width: 1rem;
  border-radius: 8px;
`;

const SmallThumbCss = css`
  -webkit-appearance: none;
  appearance: none;
  margin-top: -4px; /* Centers thumb on the track */
  background-color: ${theme.colors.pure_black};
  height: 0.6rem;
  width: 1rem;
  border-radius: 8px;
`;

type InputProps = {
  $noPadding?: boolean;
  $inputSize?: "small" | "medium" | "large";
  $noBorder?: boolean;
};

const Input = styled.input<InputProps>`
  border-radius: 2px;

  border: 1px solid ${theme.colors.secondary_font};

  width: 100%;
  outline: none;
  font-family: inherit;
  ${({ $noPadding }) =>
    !$noPadding
      ? css`
          height: 36px;
          padding: 0 12px;
        `
      : css`
          padding-block: 0.1rem;
        `}

  &:focus {
    border: 1px solid ${theme.colors.secondary_color};
  }

  &[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    &:focus {
      border: none;
    }
    outline: none;
    &::-webkit-slider-runnable-track {
      ${({ $inputSize }) => ($inputSize === "small" ? SmallTrackCss : TrackCSS)}
    }
    &::-moz-range-track {
      ${({ $inputSize }) => ($inputSize === "small" ? SmallTrackCss : TrackCSS)}
    }

    &::-webkit-slider-thumb {
      ${({ $inputSize }) => ($inputSize === "small" ? SmallThumbCss : ThumbCSS)}
    }

    &::-moz-range-thumb {
      ${({ $inputSize }) => ($inputSize === "small" ? SmallThumbCss : ThumbCSS)}
    }
  }

  ${({ $noBorder }) =>
    $noBorder &&
    css`
      border: none;
      background: none;
      font-style: italic;
    `}
`;

type ContainerProps = {
  $fullWidth?: boolean;
  $width?: string;
};

const Container = styled.div<ContainerProps>`
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}

  display:flex;
  flex-direction: column;
  gap: 12px;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const EyeContainer = styled.button`
  border: none;
  background: none;
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
`;
