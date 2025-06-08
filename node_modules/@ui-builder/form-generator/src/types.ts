export type FieldType = 'text' | 'number' | 'email' | 'password' | 'date' | 'select' | 'checkbox' | 'radio';

export type ValidationRule = {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: number | string;
  message?: string;
  validator?: (value: any) => boolean;
};

export interface FieldSchema {
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

export interface FormSchema {
  fields: FieldSchema[];
  submitButton?: {
    text: string;
  };
}

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
} 