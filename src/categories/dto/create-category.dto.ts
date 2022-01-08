import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'The name is required',
  })
  @IsString()
  @ApiProperty()
  readonly name: string;
}
