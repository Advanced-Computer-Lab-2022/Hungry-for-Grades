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
