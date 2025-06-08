import React from 'react';
import styled from '@emotion/styled';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
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

  &::placeholder {
    color: #9ca3af;
  }
`;

const HelperText = styled.span<{ isError?: boolean }>`
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: ${({ isError }) => (isError ? '#ef4444' : '#6b7280')};
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth,
  ...props
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledInput hasError={!!error} {...props} />
      {(error || helperText) && (
        <HelperText isError={!!error}>{error || helperText}</HelperText>
      )}
    </InputWrapper>
  );
}; 