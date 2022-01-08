import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/core/interfaces';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({
    message: 'The name is required',
  })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'The price is required',
  })
  readonly price: number;

  @IsString()
  @IsNotEmpty({
    message: 'The image is required',
  })
  readonly image: string;

  @IsNotEmpty({
    message: 'The category is required',
  })
  readonly category: Category;
}
