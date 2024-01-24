import React from "react";
import { Text } from "@components/Text";
import styled from "styled-components";
import { theme } from "@styles/theme";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

export const Radio = React.forwardRef(({ label, ...rest }: Props, ref: any) => {
  return (
    <Label data-testid="radio-label">
      <Input type="radio" ref={ref} {...rest} data-testid="radio-input" />
      <Text variant="body2" data-testid="radio-text">
        {label}
      </Text>
    </Label>
  );
});

Radio.displayName = "Radio";

const Input = styled.input`
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: ${theme.colors.primary};
  width: 1.15em;
  height: 1.15em;
  border: 3px solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em ${theme.colors.pure_black};
  }
  cursor: pointer;
  &:checked::before {
    transform: scale(1);
  }

  &:checked {
    --is-checked: 1;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  cursor: pointer;
`;
