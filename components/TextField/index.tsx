import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import { HTMLInputTypeAttribute } from "react";
import styled, { css } from "styled-components";

type Props = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  fullWidth?: boolean;
  width?: string;
  name?: string;
  id?: string;
  multiline?: boolean;
};

export const TextField = ({
  label,
  value,
  fullWidth,
  onChange,
  placeholder,
  type,
  width,
  name,
  id,
  multiline,
}: Props) => {
  return (
    <Container $fullWidth={fullWidth} $width={width}>
      {label && (
        <Label htmlFor={id ?? name}>
          <Text variant="body2Bold">{label}</Text>
        </Label>
      )}
      {multiline ? (
        <TextArea />
      ) : (
        <Input
          id={id ?? name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </Container>
  );
};

const Label = styled.label``;

const Input = styled.input`
  border-radius: 2px;
  border: 1px solid ${theme.colors.secondary_font};
  height: 36px;
  width: 100%;
  outline: none;
  padding: 0 12px;
`;

const TextArea = styled.textarea`
  border-radius: 2px;
  border: 1px solid ${theme.colors.secondary_font};
  height: 136px;
  width: 100%;
  outline: none;
  padding: 12px;
  resize: none;
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
