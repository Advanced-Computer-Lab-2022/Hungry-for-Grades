export type CheckBoxInputProps = {
  // data
  className: string;
  name: string;
  label: string | 'Agree to terms and conditions';
  isChecked: boolean;
  errorMessage: string | 'You must agree before submitting.';
  checked: boolean;
  required: boolean;
  value: boolean;
  // functions
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
