import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString({ message: "Field 'name' must be a string" })
  name: string;

  @ApiProperty()
  @IsString({ message: "Field 'parentCategoryId' must be a string" })
  @IsUUID('4', { message: "Field 'parentCategoryId' must be a valid UUID" })
  parentCategoryId?: string;
}
