import { DatePicker } from "@components/DatePicker";
import { TimePicker } from "@components/TimePicker";
import { FlexRow } from "@design-components/Flex";
import {
  DateValidationError,
  PickerChangeHandlerContext,
  TimeValidationError,
} from "@mui/x-date-pickers";
import { Trash } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { transparentize } from "polished";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

type DateAndTimePickerProps = {
  onChange: (date: Date | null) => void;
  timeLabel?: string;
  dateLabel?: string;
  value?: Date | null;
  error?: string;
  onClear?: () => void;
};

const merge = (date: Date, time: Date) => {
  if (!date && !time) return null;

  const newDate = new Date(date);

  if (time) {
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate.setSeconds(time.getSeconds());
  }
  return newDate;
};

export const DateAndTimePicker = ({
  timeLabel,
  dateLabel,
  onChange,
  value,
  error,
  onClear,
}: DateAndTimePickerProps) => {
  const onChangeDate = (
    newDate: Date,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    console.log(newDate, context);
    if (!!context.validationError) {
      onChange("");
      return;
    }

    if (value) {
      const updatedDate = merge(newDate, value);
      onChange(updatedDate);
    } else {
      onChange(newDate);
    }
  };

  const onChangeTime = (
    newDate: Date,
    context: PickerChangeHandlerContext<TimeValidationError>
  ) => {
    if (!!context.validationError) {
      onChange("");
      return;
    }

    if (value) {
      const updatedDate = merge(value, newDate);
      onChange(updatedDate);
    } else {
      onChange(newDate);
    }
  };

  return (
    <Container>
      <DatePicker
        label={dateLabel}
        error={error}
        onChange={onChangeDate}
        value={value}
      />
      <TimePicker label={timeLabel} onChange={onChangeTime} value={value} />
      {!!onClear && (
        <>
          <Clear id="clear-episode-data" onClick={onClear}>
            <Trash size={16} color={theme.colors.pure_black} />
          </Clear>
          <Tooltip anchorSelect="#clear-episode-data">Clear date</Tooltip>
        </>
      )}
    </Container>
  );
};

const Clear = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0;
  background-color: ${theme.colors.hover_state};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  cursor: pointer;
  transform: translate(calc(100% + 0.5rem), -100%);
  box-shadow: 0px 4px 4px 0px ${transparentize(0.75, theme.colors.pure_black)};
`;

const Container = styled(FlexRow)`
  position: relative;
`;
