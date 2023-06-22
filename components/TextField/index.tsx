import React from "react";
import { Question } from "@phosphor-icons/react";
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
        <Input $noPadding={noPadding} ref={ref} {...rest} />
        {error && (
          <Text variant="body2" color="red_danger">
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

const Input = styled.input<InputProps>`
  border-radius: 2px;
  border: 1px solid ${theme.colors.secondary_font};
  width: 100%;
  outline: none;
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
    border: 2px solid ${theme.colors.secondary_color};
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
