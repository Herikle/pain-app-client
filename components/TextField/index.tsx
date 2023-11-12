import React, { useState } from "react";
import { Eye, EyeClosed, Question } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";
import styled, { css } from "styled-components";
import { Text } from "@components/Text";
import { theme } from "@styles/theme";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  fullWidth?: boolean;
  width?: string;
  error?: string;
  helperText?: string;
  noPadding?: boolean;
}

export const TextField = React.forwardRef(
  (
    { label, fullWidth, width, error, helperText, noPadding, ...rest }: Props,
    ref: any
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Container $fullWidth={fullWidth} $width={width}>
        {label && (
          <Label htmlFor={rest?.id}>
            <Text variant="body2Bold">{label}</Text>
            {helperText && rest?.id && (
              <>
                <Question size={16} weight="fill" id={`${rest?.id}-helper`} />
                <TooltipWrapper>
                  <Tooltip anchorSelect={`#${rest?.id}-helper`} noArrow>
                    <TooltipContainer>
                      <Text variant="body2" color="font_color">
                        {helperText}
                      </Text>
                    </TooltipContainer>
                  </Tooltip>
                </TooltipWrapper>
              </>
            )}
          </Label>
        )}
        {rest.type === "password" ? (
          <InputContainer>
            <Input
              $noPadding={noPadding}
              ref={ref}
              {...rest}
              type={showPassword ? "text" : "password"}
            />
            <EyeContainer
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosed size={22} weight="bold" />
              ) : (
                <Eye size={22} weight="bold" />
              )}
            </EyeContainer>
          </InputContainer>
        ) : (
          <Input $noPadding={noPadding} ref={ref} {...rest} />
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

type InputProps = {
  $noPadding?: boolean;
};

const TrackCSS = css`
  background: ${theme.colors.light_grey};
  height: 0.5rem;
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
    margin-top: 1rem;
    &:focus {
      border: none;
    }
    outline: none;
    &::-webkit-slider-runnable-track {
      ${TrackCSS}
    }
    &::-moz-range-track {
      ${TrackCSS}
    }

    &::-webkit-slider-thumb {
      ${ThumbCSS}
    }

    &::-moz-range-thumb {
      ${ThumbCSS}
    }
  }
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
