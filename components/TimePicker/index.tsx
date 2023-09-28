import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers";
import { theme } from "@styles/theme";
import React from "react";
import styled from "styled-components";

interface TimePickerProps extends React.ComponentProps<typeof MuiTimePicker> {
  error?: string;
}

export const TimePicker = React.forwardRef(
  (
    { label, error, ...rest }: TimePickerProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <FlexColumn gap={0.7} width="100%">
        {!!label && (
          <Label>
            <Text variant="body2Bold">{label}</Text>
          </Label>
        )}
        <MuiTimePicker
          {...rest}
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

TimePicker.displayName = "TimePicker";
