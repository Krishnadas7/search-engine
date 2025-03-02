import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  genre?: string;

  @IsInt()
  @Min(1000) // Ensuring it's a valid year
  @IsNotEmpty()
  publicationYear?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
