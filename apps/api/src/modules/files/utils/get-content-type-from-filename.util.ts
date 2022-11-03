import * as mime from 'mime-types';

const DEFAULT_CONTENT_TYPE = 'application/octet-stream';

export const getContentTypeFromFilename = (filename: string): string =>
  mime.contentType(filename) || DEFAULT_CONTENT_TYPE;
