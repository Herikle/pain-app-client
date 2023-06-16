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
}

export const TextField = React.forwardRef(
  (
    { label, fullWidth, width, error, helperText, ...rest }: Props,
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
        <Input ref={ref} {...rest} />
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
  /* background-color: ${theme.colors.pure_white}; */
  /* border: 1px solid ${theme.colors.font_color};
  padding: 0.5rem; */
`;

const Input = styled.input`
  border-radius: 2px;
  border: 1px solid ${theme.colors.secondary_font};
  height: 36px;
  width: 100%;
  outline: none;
  padding: 0 12px;
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
