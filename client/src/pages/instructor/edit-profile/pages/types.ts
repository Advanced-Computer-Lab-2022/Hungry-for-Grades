export type InstructorData = {
  key?: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  role: string;
  _id: string;
};

export type InstructorSubmitActionData = {
  oldPassword: string;
  newPassword: string;
  role: string;
  _id: string;
};
