import { ISystemDefinedMetadata } from './system-defined-metadata.interface';

export interface IUserDefinedMetadata
  extends Record<string, any>,
    Partial<Pick<ISystemDefinedMetadata, 'contentLength' | 'contentType'>> {}
