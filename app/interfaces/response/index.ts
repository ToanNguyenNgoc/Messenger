export * from './ResponseOrg';
export * from './ResponseTopic';

export interface ResponseContextList<T> {
  context: {
    current_page: number;
    data: T[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  message: null;
  status: number;
}
export interface ResponseContext<T> {
  context: T;
}
