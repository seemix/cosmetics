import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface FormFieldProps {
    label: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    type?: string;
    readOnly?: boolean;
    id: string;
}