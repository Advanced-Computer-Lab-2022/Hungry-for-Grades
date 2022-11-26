import { FormEvent } from 'react';

import { type ButtonEvent, type FocusEvent } from '../../common.types';
/**
 * Button props for the customization button component
 */
export type ButtonProps = {
  id?: string;
  name: string;
  label: string;
  children?: React.ReactNode;
  correctMessage?: string;
  errorMessage?: string;
  className?: string;
  isDisabled: boolean;
  backgroundColor:
    | 'primary-bg'
    | 'secondary-bg'
    | 'primary-bg-outline'
    | 'danger-bg'
    | 'warning-bg'
    | 'success-bg'
    | 'info-bg'
    | 'light-bg'
    | 'default-bg'
    | 'dark-bg';
  type: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'secondary';
  onClickFunc?: (
    event: ButtonEvent
  ) => boolean | Promise<boolean> | void | Promise<void> | undefined;
  onMouseOutFunc?: (event: ButtonEvent) => void;
  onSubmitFunc?: (
    event: FormEvent
  ) => boolean | Promise<boolean> | void | Promise<void>;
  onMouseOverFunc?: (event: ButtonEvent) => void;
  onFocusFunc?: (event: React.FocusEvent) => void;
  onBlurFunc?: (event: FocusEvent) => void;
};
