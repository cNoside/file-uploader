import { PartialType } from '@nestjs/mapped-types';
import { UploadFileDTO } from './upload-file.dto';

export class UpdateFileDto extends PartialType(UploadFileDTO) {}
