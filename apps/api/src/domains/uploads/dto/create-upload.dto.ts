export class CreateUploadDto {
  readonly name: string;
  readonly size: number;
  readonly buffer: Buffer;
}
