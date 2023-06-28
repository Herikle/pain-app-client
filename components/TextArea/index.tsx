import { Text } from "@components/Text";
import { LightScrollBar, theme } from "@styles/theme";
import React, { HTMLInputTypeAttribute } from "react";
import styled, { css } from "styled-components";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
import { Question } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";

interface Props extends TextareaAutosizeProps {
  label?: string;
  fullWidth?: boolean;
  width?: string;
  error?: string;
  minRows?: number;
  maxRows?: number;
  helperText?: string;
}

export const TextArea = React.forwardRef(
  (
    {
      label,
      fullWidth,
      width,
      error,
      rows,
      minRows,
      maxRows,
      helperText,
      ...rest
    }: Props,
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
        <TextAreaStyled
          ref={ref}
          {...rest}
          minRows={minRows}
          maxRows={maxRows}
        />
        {error && <Text color="red_danger">{error}</Text>}
      </Container>
    );
  }
);

TextArea.displayName = "TextArea";

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

const Label = styled.label`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const TextAreaStyled = styled(TextareaAutosize)`
  border-radius: 2px;
  border: 1px solid ${theme.colors.secondary_font};
  height: 136px;
  width: 100%;
  outline: none;
  padding: 12px;
  resize: none;
  ${LightScrollBar};
  &:focus {
    border: 1px solid ${theme.colors.secondary_color};
  }
  box-sizing: border-box;
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
