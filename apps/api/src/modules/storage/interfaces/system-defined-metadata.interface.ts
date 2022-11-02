// TODO: can create metadata type based file/folder using discriminated unions

export interface ISystemDefinedMetadata extends Record<string, any> {
  contentLength: number;
  contentType: string;
}
