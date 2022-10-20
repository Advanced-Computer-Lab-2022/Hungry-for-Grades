export type ModalProps = {
  // slots
  header?: React.ReactNode;
  body?: React.ReactNode;
  loader?: React.ReactNode;
  form?: React.ReactNode;
  footer?: React.ReactNode;
  submit?: React.ReactNode;
  children?: React.ReactNode;
  // data
  id: string;
  isDelete: boolean;
  deleteText: string;
  isDone: boolean;
  doneText: string;
  isFooter: boolean;
  isClose: boolean;
  closeText: string;
  // functions
  onDelete: () => void;
  onDone: () => void;
  onClose: () => void;
};
