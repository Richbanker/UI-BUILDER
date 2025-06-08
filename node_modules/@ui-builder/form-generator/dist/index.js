"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  FormGenerator: () => FormGenerator
});
module.exports = __toCommonJS(index_exports);

// src/FormGenerator.tsx
var import_react = require("react");
var import_ui_kit = require("@ui-builder/ui-kit");
var import_jsx_runtime = require("react/jsx-runtime");
var FormGenerator = ({
  schema,
  initialData = {},
  onSubmit,
  onChange
}) => {
  const [formData, setFormData] = (0, import_react.useState)(initialData);
  const [errors, setErrors] = (0, import_react.useState)({});
  (0, import_react.useEffect)(() => {
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
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui_kit.FormItem, { ...commonProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ui_kit.DatePicker,
          {
            value: formData[field.name],
            onChange: (date) => handleChange(field, date)
          }
        ) });
      case "select":
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui_kit.FormItem, { ...commonProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "select",
          {
            value: formData[field.name] || "",
            onChange: (e) => handleChange(field, e.target.value),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: "", children: [
                "Select ",
                field.label
              ] }),
              field.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: option.value, children: option.label }, option.value))
            ]
          }
        ) });
      case "checkbox":
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui_kit.FormItem, { ...commonProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "checkbox",
            checked: !!formData[field.name],
            onChange: (e) => handleChange(field, e.target.checked)
          }
        ) });
      case "radio":
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui_kit.FormItem, { ...commonProps, children: field.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui_kit.FormItem, { ...commonProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ui_kit.Input,
          {
            type: field.type,
            value: formData[field.name] || "",
            onChange: (e) => handleChange(field, e.target.value)
          }
        ) });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleSubmit, children: [
    schema.fields.map(renderField),
    schema.submitButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui_kit.Button, { type: "submit", variant: "primary", children: schema.submitButton.text })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormGenerator
});
