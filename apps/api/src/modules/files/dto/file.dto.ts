export class FileDTO {
  readonly id: number;
  readonly ownerId: number;
  readonly filename: string;
  readonly contentType: string;
  readonly contentLength: number;
  readonly extension: string;
  readonly url: string;
}
