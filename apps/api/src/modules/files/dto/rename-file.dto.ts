import { PartialType, PickType } from '@nestjs/mapped-types';
import { UploadFileDTO } from './upload-file.dto';

export class RenameFileDto extends PickType(UploadFileDTO, ['filename']) {}
