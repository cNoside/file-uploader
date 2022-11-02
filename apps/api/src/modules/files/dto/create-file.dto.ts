import { IsDefined, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateFileDto {
  @IsNumber()
  readonly userId: number;
  @IsString()
  @IsDefined()
  @MinLength(1)
  readonly filename: string;
}
