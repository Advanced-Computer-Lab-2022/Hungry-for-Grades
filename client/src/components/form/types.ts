/* eslint-disable security/detect-object-injection */
import { FormikProps } from 'formik';
import { BaseSchema, reach } from 'yup';

export type FormProps = {
  // headers
  title?: string;
  subtitle?: string;
  // slots
  inputs: React.ReactNode;
  children?: React.ReactNode;
  // flags
  isLoading: boolean;
  isError: boolean;
  disabled: boolean;
  // form settings
  id?: string;
  className?: string;
  method: 'get' | 'post' | 'put' | 'delete';
  encType:
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain';
  name?: string;
  ariaLabel: string;
  // functions
  onSubmitFunc?: (event: React.FormEvent<HTMLFormElement>) => void;
  onResetFunc?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type TextFieldProps = {
  label: string;
  hasError: boolean;
  touched: boolean;
  name: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectFieldProps = {
  options: Array<SelectOption>;
} & TextFieldProps;

export function getTextFieldProps<T>(
  props: FormikProps<T>,
  schema: BaseSchema,
  key: keyof T,
  label?: string
): TextFieldProps {
  label = label ?? (reach(schema, key as string) as BaseSchema).spec.label;
  return {
    label: label as string,
    hasError: !!props.errors[key],
    touched: !!props.touched[key],
    name: key as string
  };
}

export function stringArrayToOptions(arr: Array<string>): SelectOption[] {
  return arr.map(s => ({
    label: s,
    value: s
  }));
}
