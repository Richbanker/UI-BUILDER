import React from 'react';

type FieldType = 'text' | 'number' | 'email' | 'password' | 'date' | 'select' | 'checkbox' | 'radio';
type ValidationRule = {
    type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
    value?: number | string;
    message?: string;
    validator?: (value: any) => boolean;
};
interface FieldSchema {
    name: string;
    type: FieldType;
    label: string;
    required?: boolean;
    validation?: ValidationRule[];
    options?: Array<{
        label: string;
        value: string | number;
    }>;
    defaultValue?: any;
}
interface FormSchema {
    fields: FieldSchema[];
    submitButton?: {
        text: string;
    };
}
interface FormData {
    [key: string]: any;
}
interface FormErrors {
    [key: string]: string;
}

interface FormGeneratorProps {
    schema: FormSchema;
    initialData?: FormData;
    onSubmit?: (data: FormData) => void;
    onChange?: (data: FormData) => void;
}
declare const FormGenerator: React.FC<FormGeneratorProps>;

export { type FieldSchema, type FieldType, type FormData, type FormErrors, FormGenerator, type FormSchema, type ValidationRule };
