import { type ChangeEvent } from '../../common.types';
export type InputProps = {
  id?: string;
  className?: string;
  label: string;
  type:
    | 'time'
    | 'email'
    | 'text'
    | 'password'
    | 'number'
    | 'url'
    | 'date'
    | 'tel'
    | 'search'
    | 'color'
    | 'range'
    | 'file';
  value: string | number;
  name: string;
  placeholder: string;
  correctMessage: string;
  errorMessage: string | undefined | string[];
  hint: string;
  isError: boolean | null;
  isTop: boolean;
  size: number;
  min?: number;
  max?: number;
  onChangeFunc: (event: ChangeEvent) => void; // for value change
  onBlurFunc?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocusFunc?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyUpFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDownFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPressFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
