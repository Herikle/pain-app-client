import { Text } from "@components/Text";
import { LightScrollBar, theme } from "@styles/theme";
import React, { HTMLInputTypeAttribute } from "react";
import styled, { css } from "styled-components";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

interface Props extends TextareaAutosizeProps {
  label?: string;
  fullWidth?: boolean;
  width?: string;
  error?: string;
}

export const TextArea = React.forwardRef(
  ({ label, fullWidth, width, error, ...rest }: Props, ref: any) => {
    return (
      <Container $fullWidth={fullWidth} $width={width}>
        {label && (
          <Label htmlFor={rest?.id}>
            <Text variant="body2Bold">{label}</Text>
          </Label>
        )}
        <TextAreaStyled ref={ref} {...rest} />
        {error && (
          <Text variant="caption" color="cta">
            {error}
          </Text>
        )}
      </Container>
    );
  }
);

TextArea.displayName = "TextArea";

const Label = styled.label``;

const TextAreaStyled = styled(TextareaAutosize)`
  border-radius: 2px;
  border: 1px solid ${theme.colors.secondary_font};
  height: 136px;
  width: 100%;
  outline: none;
  padding: 12px;
  resize: none;
  ${LightScrollBar};
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
