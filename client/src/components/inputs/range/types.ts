import { type ChangeEvent } from '../../common.types';
export type RangeProps = {
  id?: string;
  name?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (event: ChangeEvent) => void;
  label: string;
  onChangeFunc: (event: ChangeEvent) => void; // for value change
  onBlurFunc?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocusFunc?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyUpFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDownFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPressFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
