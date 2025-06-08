import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
}
declare const Button: React.FC<ButtonProps>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}
declare const Input: React.FC<InputProps>;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
}
declare const Modal: React.FC<ModalProps>;

interface FormItemProps {
    label?: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
    help?: string;
    layout?: 'horizontal' | 'vertical';
}
declare const FormItem: React.FC<FormItemProps>;

interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date) => void;
    placeholder?: string;
    format?: string;
    disabled?: boolean;
    error?: string;
}
declare const DatePicker: React.FC<DatePickerProps>;

export { Button, type ButtonProps, DatePicker, type DatePickerProps, FormItem, type FormItemProps, Input, type InputProps, Modal, type ModalProps };
