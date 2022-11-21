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
  formik: FormikProps<unknown>;
  name: string;
  id: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectFieldProps = {
  options: Array<SelectOption>;
} & TextFieldProps;

export function getTextFieldProps<T>(
  formik: FormikProps<T>,
  schema: BaseSchema,
  key: string,
  label?: string
): TextFieldProps {
  label = label ?? (reach(schema, key) as BaseSchema).spec.label;
  return {
    label: label as string,
    formik: formik as FormikProps<unknown>,
    name: key,
    id: key
  };
}

export function stringArrayToOptions(arr: Array<string>): SelectOption[] {
  return arr.map(s => ({
    label: s,
    value: s
  }));
}
