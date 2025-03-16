import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsMongoId,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsMongoId()
  //   @IsNotEmpty()
  category: string;

  @IsString()
  description: string;
}
