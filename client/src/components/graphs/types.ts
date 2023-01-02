export type GraphType = {
  name: string;
  color: string;
};

export type AnalyticsProps<T> = {
  data: T[];
  graphs: GraphType[];
};
