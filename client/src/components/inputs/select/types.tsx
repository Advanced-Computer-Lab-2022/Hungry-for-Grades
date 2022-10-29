import { ActionMeta, MultiValue, SingleValue } from 'react-select';

export type Option = {
  readonly label: string;
  readonly value: string;
};
export type SelectProps = {
  options: Option[];
  isDisabled: boolean;
  isMulti: boolean;
  isLoading: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  setSelectedOption:
    | ((
        newValue: MultiValue<Option> | SingleValue<Option>,
        actionMeta: ActionMeta<string>
      ) => void)
    | undefined;
  selectedOption: string;
  backspaceRemovesValue?: boolean;
};

export type SingleSelectProps = {
  options: Option[];
  setSelectedOption: (value: string) => void;
  selectedOption: string;
  isDisabled: boolean;
  isLoading: boolean;
};
