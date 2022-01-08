import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/core/interfaces';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({
    message: 'The name is required',
  })
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'The price is required',
  })
  @ApiProperty()
  readonly price: number;

  @IsString()
  @IsNotEmpty({
    message: 'The image is required',
  })
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty({
    message: 'The category is required',
  })
  @ApiProperty({
    default: {
      _id: 'string',
      name: 'string',
    },
  })
  readonly category: Category;
}
