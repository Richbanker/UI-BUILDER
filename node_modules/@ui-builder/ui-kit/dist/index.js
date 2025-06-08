"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  DatePicker: () => DatePicker,
  FormItem: () => FormItem,
  Input: () => Input,
  Modal: () => Modal
});
module.exports = __toCommonJS(index_exports);

// src/components/Button/Button.tsx
var import_styled = __toESM(require("@emotion/styled"));
var import_jsx_runtime = require("react/jsx-runtime");
var StyledButton = import_styled.default.button`
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledButton, { disabled: disabled || isLoading, ...props, children: isLoading ? "Loading..." : children });
};

// src/components/Input/Input.tsx
var import_styled2 = __toESM(require("@emotion/styled"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var InputWrapper = import_styled2.default.div`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => fullWidth ? "100%" : "auto"};
`;
var Label = import_styled2.default.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;
var StyledInput = import_styled2.default.input`
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
var HelperText = import_styled2.default.span`
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(InputWrapper, { fullWidth, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StyledInput, { hasError: !!error, ...props }),
    (error || helperText) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HelperText, { isError: !!error, children: error || helperText })
  ] });
};

// src/components/Modal/Modal.tsx
var import_react = require("react");
var import_styled3 = __toESM(require("@emotion/styled"));
var import_react_dom = require("react-dom");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Overlay = import_styled3.default.div`
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
var ModalContainer = import_styled3.default.div`
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
var Header = import_styled3.default.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
var Title = import_styled3.default.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;
var CloseButton = import_styled3.default.button`
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
var Content = import_styled3.default.div`
  padding: 1.5rem;
`;
var Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium"
}) => {
  (0, import_react.useEffect)(() => {
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
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Overlay, { onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ModalContainer, { size, onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Header, { children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Title, { children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CloseButton, { onClick: onClose, children: "\xD7" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Content, { children })
    ] }) }),
    document.body
  );
};

// src/components/FormItem/FormItem.tsx
var import_styled4 = __toESM(require("@emotion/styled"));
var import_jsx_runtime4 = require("react/jsx-runtime");
var FormItemWrapper = import_styled4.default.div`
  display: flex;
  flex-direction: ${({ layout }) => layout === "horizontal" ? "row" : "column"};
  margin-bottom: 1rem;
  align-items: ${({ layout }) => layout === "horizontal" ? "center" : "flex-start"};
`;
var LabelWrapper = import_styled4.default.div`
  min-width: ${({ layout }) => layout === "horizontal" ? "120px" : "auto"};
  margin-bottom: ${({ layout }) => layout === "horizontal" ? "0" : "0.5rem"};
  margin-right: ${({ layout }) => layout === "horizontal" ? "1rem" : "0"};
`;
var Label2 = import_styled4.default.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
`;
var RequiredMark = import_styled4.default.span`
  color: #ef4444;
  margin-left: 0.25rem;
`;
var ContentWrapper = import_styled4.default.div`
  flex: 1;
  width: 100%;
`;
var ErrorMessage = import_styled4.default.div`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;
var HelpText = import_styled4.default.div`
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(FormItemWrapper, { layout, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LabelWrapper, { layout, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Label2, { children: [
      label,
      required && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RequiredMark, { children: "*" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ContentWrapper, { children: [
      children,
      error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ErrorMessage, { children: error }),
      help && !error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(HelpText, { children: help })
    ] })
  ] });
};

// src/components/DatePicker/DatePicker.tsx
var import_react2 = require("react");
var import_styled5 = __toESM(require("@emotion/styled"));
var import_date_fns = require("date-fns");
var import_jsx_runtime5 = require("react/jsx-runtime");
var DatePickerWrapper = import_styled5.default.div`
  position: relative;
  width: 100%;
`;
var Input2 = import_styled5.default.input`
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
var Calendar = import_styled5.default.div`
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
var CalendarHeader = import_styled5.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
var MonthYear = import_styled5.default.div`
  font-weight: 500;
  color: #111827;
`;
var NavigationButton = import_styled5.default.button`
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
var WeekDays = import_styled5.default.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;
var WeekDay = import_styled5.default.div`
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
`;
var Days = import_styled5.default.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;
var Day = import_styled5.default.button`
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
  const [isOpen, setIsOpen] = (0, import_react2.useState)(false);
  const [currentDate, setCurrentDate] = (0, import_react2.useState)(value || /* @__PURE__ */ new Date());
  const [inputValue, setInputValue] = (0, import_react2.useState)(
    value ? (0, import_date_fns.format)(value, dateFormat) : ""
  );
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const parsedDate = (0, import_date_fns.parse)(newValue, dateFormat, /* @__PURE__ */ new Date());
    if ((0, import_date_fns.isValid)(parsedDate)) {
      onChange?.(parsedDate);
    }
  };
  const handleDayClick = (day) => {
    onChange?.(day);
    setInputValue((0, import_date_fns.format)(day, dateFormat));
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
      days.push(/* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Day, { disabled: true }, `empty-${i}`));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = value && (0, import_date_fns.format)(value, "yyyy-MM-dd") === (0, import_date_fns.format)(date, "yyyy-MM-dd");
      const isToday = (0, import_date_fns.format)(/* @__PURE__ */ new Date(), "yyyy-MM-dd") === (0, import_date_fns.format)(date, "yyyy-MM-dd");
      days.push(
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Calendar, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(CalendarHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(NavigationButton, { onClick: handlePrevMonth, children: "\u2190" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MonthYear, { children: (0, import_date_fns.format)(currentDate, "MMMM yyyy") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(NavigationButton, { onClick: handleNextMonth, children: "\u2192" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(WeekDays, { children: weekDays.map((day) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(WeekDay, { children: day }, day)) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Days, { children: days })
    ] });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(DatePickerWrapper, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  DatePicker,
  FormItem,
  Input,
  Modal
});
