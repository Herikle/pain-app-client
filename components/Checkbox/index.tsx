import { Text } from "@components/Text";
import { CheckFat } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { keyframes, styled } from "styled-components";

type Props = {
  label: string;
};

export const Checkbox = ({ label }: Props) => {
  return (
    <Label>
      <Text variant="body2">{label}</Text>
      <Input type="checkbox" />
      <CheckMark>
        <CheckMarkChecked>
          <CheckFat size={12} color={theme.colors.hover_state} weight="fill" />
        </CheckMarkChecked>
      </CheckMark>
    </Label>
  );
};

const BounceAnimation = keyframes`
  0% { transform: scale(0.1) translate(-50%, -50%); }
  50% { transform: scale(1.2) translate(-50%, -50%); }
  100% { transform: scale(1) translate(-50%, -50%); }
`;

const CheckMarkChecked = styled.span`
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${BounceAnimation} 0.3s ease-in-out;
`;

const CheckMark = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 1rem;
  width: 1rem;
  background-color: ${theme.colors.pure_white};
  border: 3px solid ${theme.colors.text_switched};
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Label = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  padding-left: 1.5rem;
  width: fit-content;
  &:hover ${Input} ~ ${CheckMark} {
    background-color: ${theme.colors.hover_state};
  }

  ${Input}:checked ~ ${CheckMark} {
    background-color: ${theme.colors.font_color};
    border: 1px solid ${theme.colors.font_color};
  }

  ${Input}:checked ~ ${CheckMark} ${CheckMarkChecked} {
    display: block;
  }
`;
