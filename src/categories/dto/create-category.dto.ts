import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'The name is required',
  })
  @IsString()
  readonly name: string;
}
