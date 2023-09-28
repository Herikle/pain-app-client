import { DatePicker } from "@components/DatePicker";
import { TimePicker } from "@components/TimePicker";
import { FlexRow } from "@design-components/Flex";
import {
  DateValidationError,
  PickerChangeHandlerContext,
  TimeValidationError,
} from "@mui/x-date-pickers";
import { useState } from "react";

type DateAndTimePickerProps = {
  onChange: (date: Date) => void;
  timeLabel?: string;
  dateLabel?: string;
  value?: Date;
  error?: string;
};

const merge = (date: Date, time: Date) => {
  const newDate = new Date(date);
  newDate.setHours(time.getHours());
  newDate.setMinutes(time.getMinutes());
  newDate.setSeconds(time.getSeconds());
  return newDate;
};

export const DateAndTimePicker = ({
  timeLabel,
  dateLabel,
  onChange,
  value,
  error,
}: DateAndTimePickerProps) => {
  const onChangeDate = (
    newDate: Date,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    if (!!context.validationError) return;

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
    if (!!context.validationError) return;

    if (value) {
      const updatedDate = merge(value, newDate);
      onChange(updatedDate);
    } else {
      onChange(newDate);
    }
  };

  return (
    <FlexRow>
      <DatePicker
        label={dateLabel}
        error={error}
        onChange={onChangeDate}
        value={value}
      />
      <TimePicker label={timeLabel} onChange={onChangeTime} value={value} />
    </FlexRow>
  );
};

//merge date and time from two dates
