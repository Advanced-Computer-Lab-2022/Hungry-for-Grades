export type SearchBarProps = {
  key: string;
  id?: string;
  value: string;
  className?: string;
  name: string;
  placeholder: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    searchTerm: string
  ) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
