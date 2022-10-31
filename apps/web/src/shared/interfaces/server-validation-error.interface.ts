export interface IServerValidationError<T extends Record<string, any> = any> {
  field: keyof T;
  message: string;
}
