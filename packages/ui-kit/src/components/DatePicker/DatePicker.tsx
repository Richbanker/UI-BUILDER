import React, { useState } from 'react';
import styled from '@emotion/styled';
import { format, parse, isValid } from 'date-fns';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  error?: string;
}

const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ hasError }) => (hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #111827;
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? '#ef4444' : '#2563eb')};
    box-shadow: 0 0 0 3px ${({ hasError }) => (hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(37, 99, 235, 0.1)')};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

const Calendar = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  width: 300px;
  padding: 1rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MonthYear = styled.div`
  font-weight: 500;
  color: #111827;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #111827;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const Day = styled.button<{ isSelected?: boolean; isToday?: boolean }>`
  background: ${({ isSelected }) => (isSelected ? '#2563eb' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#111827')};
  border: 1px solid ${({ isToday }) => (isToday ? '#2563eb' : 'transparent')};
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#2563eb' : '#f3f4f6')};
  }

  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  format: dateFormat = 'MM/dd/yyyy',
  disabled,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [inputValue, setInputValue] = useState(
    value ? format(value, dateFormat) : ''
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsedDate = parse(newValue, dateFormat, new Date());
    if (isValid(parsedDate)) {
      onChange?.(parsedDate);
    }
  };

  const handleDayClick = (day: Date) => {
    onChange?.(day);
    setInputValue(format(day, dateFormat));
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const days: React.ReactNode[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<Day key={`empty-${i}`} disabled />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = value && format(value, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      const isToday = format(new Date(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');

      days.push(
        <Day
          key={day}
          isSelected={isSelected}
          isToday={isToday}
          onClick={() => handleDayClick(date)}
        >
          {day}
        </Day>
      );
    }

    return (
      <Calendar>
        <CalendarHeader>
          <NavigationButton onClick={handlePrevMonth}>←</NavigationButton>
          <MonthYear>{format(currentDate, 'MMMM yyyy')}</MonthYear>
          <NavigationButton onClick={handleNextMonth}>→</NavigationButton>
        </CalendarHeader>
        <WeekDays>
          {weekDays.map((day) => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
        </WeekDays>
        <Days>{days}</Days>
      </Calendar>
    );
  };

  return (
    <DatePickerWrapper>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        hasError={!!error}
      />
      {isOpen && !disabled && renderCalendar()}
    </DatePickerWrapper>
  );
}; 