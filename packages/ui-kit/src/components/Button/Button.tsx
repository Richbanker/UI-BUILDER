import React from 'react';
import styled from '@emotion/styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: #2563eb;
          color: white;
          border: none;
          &:hover {
            background-color: #1d4ed8;
          }
        `;
      case 'secondary':
        return `
          background-color: #e5e7eb;
          color: #374151;
          border: none;
          &:hover {
            background-color: #d1d5db;
          }
        `;
      case 'outline':
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

  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'medium':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
      case 'large':
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

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  disabled,
  ...props
}) => {
  return (
    <StyledButton disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </StyledButton>
  );
}; 