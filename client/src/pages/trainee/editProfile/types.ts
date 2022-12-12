export type TraineeData = {
  key?: string;
  name: string | undefined;
  email: { address: string | undefined };
  phone: string | undefined;
  username: string | undefined;
};

export type PropsTraineeData = {
  initialValues: TraineeData;
  submitAction: (traineeData: TraineeData) => void;
};
