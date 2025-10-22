import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSourceDto {
  @ApiProperty()
  @IsString({ message: 'Field "name" must be a string' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Field "domain" must be a string' })
  domain: string;

  @ApiProperty()
  @IsString({ message: 'Field "country" must be a string' })
  country: string;
}
