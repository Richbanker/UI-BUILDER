// src/FormGenerator.tsx
import { useState, useEffect } from "react";
import { Button, Input, FormItem, DatePicker } from "@ui-builder/ui-kit";
import { jsx, jsxs } from "react/jsx-runtime";
var FormGenerator = ({
  schema,
  initialData = {},
  onSubmit,
  onChange
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);
  const validateField = (field, value) => {
    if (field.required && !value) {
      return "This field is required";
    }
    if (field.validation) {
      for (const rule of field.validation) {
        if (rule.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return rule.message || "Invalid email format";
        }
        if (rule.type === "minLength" && typeof rule.value === "number" && value.length < rule.value) {
          return rule.message || `Minimum length is ${rule.value}`;
        }
        if (rule.type === "maxLength" && typeof rule.value === "number" && value.length > rule.value) {
          return rule.message || `Maximum length is ${rule.value}`;
        }
        if (rule.type === "pattern" && typeof rule.value === "string" && !new RegExp(rule.value).test(value)) {
          return rule.message || "Invalid format";
        }
        if (rule.type === "custom" && rule.validator && !rule.validator(value)) {
          return rule.message || "Invalid value";
        }
      }
    }
    return void 0;
  };
  const handleChange = (field, value) => {
    const newData = { ...formData, [field.name]: value };
    setFormData(newData);
    const error = validateField(field, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field.name] = error;
      } else {
        delete newErrors[field.name];
      }
      return newErrors;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasErrors = false;
    schema.fields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });
    setErrors(newErrors);
    if (!hasErrors && onSubmit) {
      onSubmit(formData);
    }
  };
  const renderField = (field) => {
    const commonProps = {
      key: field.name,
      label: field.label,
      error: errors[field.name],
      required: field.required
    };
    switch (field.type) {
      case "date":
        return /* @__PURE__ */ jsx(FormItem, { ...commonProps, children: /* @__PURE__ */ jsx(
          DatePicker,
          {
            value: formData[field.name],
            onChange: (date) => handleChange(field, date)
          }
        ) });
      case "select":
        return /* @__PURE__ */ jsx(FormItem, { ...commonProps, children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: formData[field.name] || "",
            onChange: (e) => handleChange(field, e.target.value),
            children: [
              /* @__PURE__ */ jsxs("option", { value: "", children: [
                "Select ",
                field.label
              ] }),
              field.options?.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
            ]
          }
        ) });
      case "checkbox":
        return /* @__PURE__ */ jsx(FormItem, { ...commonProps, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: !!formData[field.name],
            onChange: (e) => handleChange(field, e.target.checked)
          }
        ) });
      case "radio":
        return /* @__PURE__ */ jsx(FormItem, { ...commonProps, children: field.options?.map((option) => /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: field.name,
              value: option.value,
              checked: formData[field.name] === option.value,
              onChange: (e) => handleChange(field, e.target.value)
            }
          ),
          option.label
        ] }, option.value)) });
      default:
        return /* @__PURE__ */ jsx(FormItem, { ...commonProps, children: /* @__PURE__ */ jsx(
          Input,
          {
            type: field.type,
            value: formData[field.name] || "",
            onChange: (e) => handleChange(field, e.target.value)
          }
        ) });
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    schema.fields.map(renderField),
    schema.submitButton && /* @__PURE__ */ jsx(Button, { type: "submit", variant: "primary", children: schema.submitButton.text })
  ] });
};
export {
  FormGenerator
};
