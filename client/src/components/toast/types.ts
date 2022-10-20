export type MessageToastProps = {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
};

export type PromiseToastProps = {
  request: Promise<void>;
  messages: {
    pending: string;
    success: string;
    error: string;
  };
};
