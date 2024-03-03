import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { theme } from "@styles/theme";
import React from "react";
import styled from "styled-components";

interface DatePickerProps extends React.ComponentProps<typeof MuiDatePicker> {
  error?: string;
  onClear?: () => void;
}

export const DatePicker = React.forwardRef(
  (
    { label, error, onClear, ...rest }: DatePickerProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <FlexColumn gap={0.7} width="100%">
        {!!label && (
          <Label>
            <Text variant="body2Bold">{label}</Text>
          </Label>
        )}
        <MuiDatePicker
          {...rest}
          defaultValue={null}
          ref={ref}
          sx={{
            "& .MuiInputBase-root": {
              height: "36px",
              borderRadius: "2px",
              border: `1px solid ${theme.colors.secondary_font}`,
              "&.Mui-focused": {
                border: `1px solid ${theme.colors.secondary_color}`,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
            },
          }}
          slotProps={{
            field: {
              clearable: !!onClear,
              onClear: () => {
                onClear?.();
              },
            },
          }}
        />
        {error && (
          <Text variant="caption" color="red_danger">
            {error}
          </Text>
        )}
      </FlexColumn>
    );
  }
);

const Label = styled.label`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

DatePicker.displayName = "DatePicker";
