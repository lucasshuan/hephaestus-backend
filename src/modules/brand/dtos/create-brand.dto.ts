import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty()
  @IsString({ message: 'Field "name" must be a string' })
  name: string;
}
