// src/components/Button/Button.tsx
import styled from "@emotion/styled";
import { jsx } from "react/jsx-runtime";
var StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${({ variant = "primary" }) => {
  switch (variant) {
    case "primary":
      return `
          background-color: #2563eb;
          color: white;
          border: none;
          &:hover {
            background-color: #1d4ed8;
          }
        `;
    case "secondary":
      return `
          background-color: #e5e7eb;
          color: #374151;
          border: none;
          &:hover {
            background-color: #d1d5db;
          }
        `;
    case "outline":
      return `
          background-color: transparent;
          color: #2563eb;
          border: 1px solid #2563eb;
          &:hover {
            background-color: #f3f4f6;
          }
        `;
  }
}}

  ${({ size = "medium" }) => {
  switch (size) {
    case "small":
      return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
    case "medium":
      return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    case "large":
      return `
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
  }
}}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var Button = ({
  children,
  isLoading,
  disabled,
  ...props
}) => {
  return /* @__PURE__ */ jsx(StyledButton, { disabled: disabled || isLoading, ...props, children: isLoading ? "Loading..." : children });
};

// src/components/Input/Input.tsx
import styled2 from "@emotion/styled";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var InputWrapper = styled2.div`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => fullWidth ? "100%" : "auto"};
`;
var Label = styled2.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;
var StyledInput = styled2.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ hasError }) => hasError ? "#ef4444" : "#d1d5db"};
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #111827;
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? "#ef4444" : "#2563eb"};
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(37, 99, 235, 0.1)"};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;
var HelperText = styled2.span`
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: ${({ isError }) => isError ? "#ef4444" : "#6b7280"};
`;
var Input = ({
  label,
  error,
  helperText,
  fullWidth,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(InputWrapper, { fullWidth, children: [
    label && /* @__PURE__ */ jsx2(Label, { children: label }),
    /* @__PURE__ */ jsx2(StyledInput, { hasError: !!error, ...props }),
    (error || helperText) && /* @__PURE__ */ jsx2(HelperText, { isError: !!error, children: error || helperText })
  ] });
};

// src/components/Modal/Modal.tsx
import { useEffect } from "react";
import styled3 from "@emotion/styled";
import { createPortal } from "react-dom";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Overlay = styled3.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
var ModalContainer = styled3.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: ${({ size }) => {
  switch (size) {
    case "small":
      return "400px";
    case "large":
      return "800px";
    default:
      return "600px";
  }
}};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.2s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
var Header = styled3.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
var Title = styled3.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;
var CloseButton = styled3.button`
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
var Content = styled3.div`
  padding: 1.5rem;
`;
var Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium"
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return createPortal(
    /* @__PURE__ */ jsx3(Overlay, { onClick: onClose, children: /* @__PURE__ */ jsxs2(ModalContainer, { size, onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxs2(Header, { children: [
        title && /* @__PURE__ */ jsx3(Title, { children: title }),
        /* @__PURE__ */ jsx3(CloseButton, { onClick: onClose, children: "\xD7" })
      ] }),
      /* @__PURE__ */ jsx3(Content, { children })
    ] }) }),
    document.body
  );
};

// src/components/FormItem/FormItem.tsx
import styled4 from "@emotion/styled";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var FormItemWrapper = styled4.div`
  display: flex;
  flex-direction: ${({ layout }) => layout === "horizontal" ? "row" : "column"};
  margin-bottom: 1rem;
  align-items: ${({ layout }) => layout === "horizontal" ? "center" : "flex-start"};
`;
var LabelWrapper = styled4.div`
  min-width: ${({ layout }) => layout === "horizontal" ? "120px" : "auto"};
  margin-bottom: ${({ layout }) => layout === "horizontal" ? "0" : "0.5rem"};
  margin-right: ${({ layout }) => layout === "horizontal" ? "1rem" : "0"};
`;
var Label2 = styled4.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
`;
var RequiredMark = styled4.span`
  color: #ef4444;
  margin-left: 0.25rem;
`;
var ContentWrapper = styled4.div`
  flex: 1;
  width: 100%;
`;
var ErrorMessage = styled4.div`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;
var HelpText = styled4.div`
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;
var FormItem = ({
  label,
  required,
  error,
  children,
  help,
  layout = "vertical"
}) => {
  return /* @__PURE__ */ jsxs3(FormItemWrapper, { layout, children: [
    label && /* @__PURE__ */ jsx4(LabelWrapper, { layout, children: /* @__PURE__ */ jsxs3(Label2, { children: [
      label,
      required && /* @__PURE__ */ jsx4(RequiredMark, { children: "*" })
    ] }) }),
    /* @__PURE__ */ jsxs3(ContentWrapper, { children: [
      children,
      error && /* @__PURE__ */ jsx4(ErrorMessage, { children: error }),
      help && !error && /* @__PURE__ */ jsx4(HelpText, { children: help })
    ] })
  ] });
};

// src/components/DatePicker/DatePicker.tsx
import { useState } from "react";
import styled5 from "@emotion/styled";
import { format, parse, isValid } from "date-fns";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var DatePickerWrapper = styled5.div`
  position: relative;
  width: 100%;
`;
var Input2 = styled5.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ hasError }) => hasError ? "#ef4444" : "#d1d5db"};
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #111827;
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? "#ef4444" : "#2563eb"};
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(37, 99, 235, 0.1)"};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;
var Calendar = styled5.div`
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
var CalendarHeader = styled5.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
var MonthYear = styled5.div`
  font-weight: 500;
  color: #111827;
`;
var NavigationButton = styled5.button`
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
var WeekDays = styled5.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;
var WeekDay = styled5.div`
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
`;
var Days = styled5.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;
var Day = styled5.button`
  background: ${({ isSelected }) => isSelected ? "#2563eb" : "transparent"};
  color: ${({ isSelected }) => isSelected ? "white" : "#111827"};
  border: 1px solid ${({ isToday }) => isToday ? "#2563eb" : "transparent"};
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ isSelected }) => isSelected ? "#2563eb" : "#f3f4f6"};
  }

  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;
var DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  format: dateFormat = "MM/dd/yyyy",
  disabled,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || /* @__PURE__ */ new Date());
  const [inputValue, setInputValue] = useState(
    value ? format(value, dateFormat) : ""
  );
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const parsedDate = parse(newValue, dateFormat, /* @__PURE__ */ new Date());
    if (isValid(parsedDate)) {
      onChange?.(parsedDate);
    }
  };
  const handleDayClick = (day) => {
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
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(/* @__PURE__ */ jsx5(Day, { disabled: true }, `empty-${i}`));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = value && format(value, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
      const isToday = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
      days.push(
        /* @__PURE__ */ jsx5(
          Day,
          {
            isSelected,
            isToday,
            onClick: () => handleDayClick(date),
            children: day
          },
          day
        )
      );
    }
    return /* @__PURE__ */ jsxs4(Calendar, { children: [
      /* @__PURE__ */ jsxs4(CalendarHeader, { children: [
        /* @__PURE__ */ jsx5(NavigationButton, { onClick: handlePrevMonth, children: "\u2190" }),
        /* @__PURE__ */ jsx5(MonthYear, { children: format(currentDate, "MMMM yyyy") }),
        /* @__PURE__ */ jsx5(NavigationButton, { onClick: handleNextMonth, children: "\u2192" })
      ] }),
      /* @__PURE__ */ jsx5(WeekDays, { children: weekDays.map((day) => /* @__PURE__ */ jsx5(WeekDay, { children: day }, day)) }),
      /* @__PURE__ */ jsx5(Days, { children: days })
    ] });
  };
  return /* @__PURE__ */ jsxs4(DatePickerWrapper, { children: [
    /* @__PURE__ */ jsx5(
      Input2,
      {
        type: "text",
        value: inputValue,
        onChange: handleInputChange,
        onFocus: () => setIsOpen(true),
        placeholder,
        disabled,
        hasError: !!error
      }
    ),
    isOpen && !disabled && renderCalendar()
  ] });
};
export {
  Button,
  DatePicker,
  FormItem,
  Input,
  Modal
};
