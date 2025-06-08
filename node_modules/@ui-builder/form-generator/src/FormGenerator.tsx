import React, { useState, useEffect } from 'react';
import { Button, Input, FormItem, DatePicker } from '@ui-builder/ui-kit';
import { FormSchema, FormData, FormErrors, FieldSchema } from './types';

interface FormGeneratorProps {
  schema: FormSchema;
  initialData?: FormData;
  onSubmit?: (data: FormData) => void;
  onChange?: (data: FormData) => void;
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({
  schema,
  initialData = {},
  onSubmit,
  onChange,
}) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  const validateField = (field: FieldSchema, value: any): string | undefined => {
    if (field.required && !value) {
      return 'Это поле обязательно для заполнения';
    }

    if (field.validation) {
      for (const rule of field.validation) {
        if (rule.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return rule.message || 'Неверный формат email';
        }
        if (rule.type === 'minLength' && typeof rule.value === 'number' && value.length < rule.value) {
          return rule.message || `Минимальная длина ${rule.value} символов`;
        }
        if (rule.type === 'maxLength' && typeof rule.value === 'number' && value.length > rule.value) {
          return rule.message || `Максимальная длина ${rule.value} символов`;
        }
        if (rule.type === 'pattern' && typeof rule.value === 'string' && !new RegExp(rule.value).test(value)) {
          return rule.message || 'Неверный формат';
        }
        if (rule.type === 'custom' && rule.validator && !rule.validator(value)) {
          return rule.message || 'Неверное значение';
        }
      }
    }

    return undefined;
  };

  const handleChange = (field: FieldSchema, value: any) => {
    const newData = { ...formData, [field.name]: value };
    setFormData(newData);

    const error = validateField(field, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field.name] = error;
      } else {
        delete newErrors[field.name];
      }
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasErrors = false;

    schema.fields.forEach(field => {
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

  const renderField = (field: FieldSchema) => {
    const commonProps = {
      label: field.label,
      error: errors[field.name],
      required: field.required,
    };

    switch (field.type) {
      case 'date':
        return (
          <FormItem key={field.name} {...commonProps}>
            <DatePicker
              value={formData[field.name]}
              onChange={(date: Date) => handleChange(field, date)}
            />
          </FormItem>
        );

      case 'select':
        return (
          <FormItem key={field.name} {...commonProps}>
            <select
              value={formData[field.name] || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(field, e.target.value)}
            >
              <option value="">Выберите {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormItem>
        );

      case 'checkbox':
        return (
          <FormItem key={field.name} {...commonProps}>
            <input
              type="checkbox"
              checked={!!formData[field.name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field, e.target.checked)}
            />
          </FormItem>
        );

      case 'radio':
        return (
          <FormItem key={field.name} {...commonProps}>
            {field.options?.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field, e.target.value)}
                />
                {option.label}
              </label>
            ))}
          </FormItem>
        );

      default:
        return (
          <FormItem key={field.name} {...commonProps}>
            <Input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field, e.target.value)}
            />
          </FormItem>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.fields.map(renderField)}
      {schema.submitButton && (
        <Button type="submit" variant="primary">
          {schema.submitButton.text}
        </Button>
      )}
    </form>
  );
}; 