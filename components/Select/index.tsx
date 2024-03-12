import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { Question } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { Tooltip } from "react-tooltip";
import styled, { css } from "styled-components";
import React from "react";

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  options: any[];
  getLabel: (option: any) => string;
  getValue: (option: any) => string;
  id: string;
  label?: string;
  helperText?: string;
  noPadding?: boolean;
  error?: string;
}

export const Select = React.forwardRef(
  (
    {
      options,
      getLabel,
      getValue,
      id,
      label,
      helperText,
      noPadding,
      error,
      ...rest
    }: SelectProps,
    ref: any
  ) => {
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
        <SelectStyled
          defaultValue={""}
          $noPadding={noPadding}
          {...rest}
          ref={ref}
        >
          <option value="" disabled>
            Select
          </option>
          {options.map((option) => (
            <option key={getValue(option)} value={getValue(option)}>
              {getLabel(option)}
            </option>
          ))}
        </SelectStyled>
        {error && (
          <Text variant="caption" color="red_danger">
            {error}
          </Text>
        )}
      </Container>
    );
  }
);

Select.displayName = "Select";

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
  background-image: url("/icons/select-caret.svg");
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
