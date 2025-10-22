import { ComponentTier } from '@/database/enums/component_tier';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateComponentDto {
  @ApiProperty()
  @IsString({ message: 'Field "name" must be a string' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Field "model" must be a string' })
  model: string;

  @ApiProperty()
  @IsString({ message: 'Field "tier" must be a string' })
  @IsEnum(ComponentTier, { message: 'Field "tier" must be a valid tier' })
  tier: ComponentTier;

  @ApiProperty()
  @IsString({ message: 'Field "description" must be a string' })
  description: string;

  @ApiProperty()
  @IsString({ message: 'Field "brandId" must be a string' })
  @IsUUID('4', { message: 'Field "brandId" must be a valid UUID' })
  brandId: string;

  @ApiProperty()
  @IsString({ message: 'Field "sourceId" must be a string' })
  @IsUUID('4', { message: 'Field "sourceId" must be a valid UUID' })
  sourceId: string;
}
