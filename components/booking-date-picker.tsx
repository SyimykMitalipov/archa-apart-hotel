"use client";

import type { CalendarDate } from "@internationalized/date";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment,
  Dialog, Group, Heading, Label, Popover,
} from "react-aria-components";

export function BookingDatePicker({
  label, minValue, onChange,
}: {
  label: string;
  minValue: CalendarDate;
  onChange?: (value: CalendarDate | null) => void;
}) {
  return (
    <DatePicker<CalendarDate> className="booking-field" minValue={minValue}
      onChange={onChange} isRequired granularity="day">
      <Label>{label}</Label>
      <Group className="booking-control booking-date">
        <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
        <Button className="booking-icon" aria-label={`Выбрать дату: ${label.toLowerCase()}`}>
          <CalendarDays size={18} aria-hidden="true" />
        </Button>
      </Group>
      <Popover className="booking-popover" placement="bottom start">
        <Dialog className="booking-calendar" aria-label={label}>
          <Calendar>
            <header>
              <Button slot="previous" className="booking-icon" aria-label="Предыдущий месяц">
                <ChevronLeft size={18} aria-hidden="true" />
              </Button>
              <Heading />
              <Button slot="next" className="booking-icon" aria-label="Следующий месяц">
                <ChevronRight size={18} aria-hidden="true" />
              </Button>
            </header>
            <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
