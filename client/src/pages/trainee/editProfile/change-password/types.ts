export type TraineeData = {
  key?: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  role: string;
  _id: string;
};

export type TraineeSubmitActionData = {
  oldPassword: string;
  newPassword: string;
  role: string;
  _id: string;
};
