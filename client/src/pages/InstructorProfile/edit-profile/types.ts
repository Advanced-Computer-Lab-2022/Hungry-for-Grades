export type InstructorData = {
  key?: string;
  name: string | undefined;
  email: { address: string | undefined };
  phone: string | undefined;
  username: string | undefined;
  biography: string | undefined;
};

export type PropsInstructorData = {
  initialValues: InstructorData;
  submitAction: (instructorData: InstructorData) => void;
};
