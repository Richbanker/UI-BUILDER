import React from 'react';
import styled from '@emotion/styled';

export interface FormItemProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  help?: string;
  layout?: 'horizontal' | 'vertical';
}

const FormItemWrapper = styled.div<{ layout?: string }>`
  display: flex;
  flex-direction: ${({ layout }) => (layout === 'horizontal' ? 'row' : 'column')};
  margin-bottom: 1rem;
  align-items: ${({ layout }) => (layout === 'horizontal' ? 'center' : 'flex-start')};
`;

const LabelWrapper = styled.div<{ layout?: string }>`
  min-width: ${({ layout }) => (layout === 'horizontal' ? '120px' : 'auto')};
  margin-bottom: ${({ layout }) => (layout === 'horizontal' ? '0' : '0.5rem')};
  margin-right: ${({ layout }) => (layout === 'horizontal' ? '1rem' : '0')};
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
`;

const RequiredMark = styled.span`
  color: #ef4444;
  margin-left: 0.25rem;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const HelpText = styled.div`
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const FormItem: React.FC<FormItemProps> = ({
  label,
  required,
  error,
  children,
  help,
  layout = 'vertical',
}) => {
  return (
    <FormItemWrapper layout={layout}>
      {label && (
        <LabelWrapper layout={layout}>
          <Label>
            {label}
            {required && <RequiredMark>*</RequiredMark>}
          </Label>
        </LabelWrapper>
      )}
      <ContentWrapper>
        {children}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {help && !error && <HelpText>{help}</HelpText>}
      </ContentWrapper>
    </FormItemWrapper>
  );
}; 