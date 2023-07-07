import { Text } from "@components/Text";
import CaretSelectIcon from "public/icons/select-caret.svg";
import { FlexColumn } from "@design-components/Flex";
import { Question } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { Tooltip } from "react-tooltip";
import styled, { css } from "styled-components";

type SelectProps = {
  options: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  getLabel: (option: any) => string;
  getValue: (option: any) => string;
  id: string;
  label?: string;
  helperText?: string;
  noPadding?: boolean;
};

export const Select = ({
  options,
  onChange,
  value,
  getLabel,
  getValue,
  id,
  label,
  helperText,
  noPadding,
}: SelectProps) => {
  return (
    <Container gap={0.75}>
      {label && (
        <Label htmlFor={id}>
          <Text variant="body2Bold">{label}</Text>
          {helperText && id && (
            <>
              <Question size={16} weight="fill" id={`${id}-helper`} />
              <TooltipWrapper>
                <Tooltip anchorSelect={`#${id}-helper`} noArrow>
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
      <SelectStyled $noPadding={noPadding} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={getValue(option)} value={getValue(option)}>
            {getLabel(option)}
          </option>
        ))}
      </SelectStyled>
    </Container>
  );
};

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

type SelectStyledProps = {
  $noPadding?: boolean;
};

const SelectStyled = styled.select<SelectStyledProps>`
  border: 1px solid ${theme.colors.secondary_font};
  border-radius: 2px;
  background-color: ${theme.colors.pure_white};
  outline: none;
  appearance: none;
  background-image: url(${CaretSelectIcon.src});
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
  cursor: pointer;
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
`;

const Container = styled(FlexColumn)``;
