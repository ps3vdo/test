import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { Transform, Type } from "class-transformer";

export class GetByIdOrSlugDto {
  id: string;
}
export class GetByIdDto {
  @IsNotEmpty()
  @IsUUID("4")
  id: string;
}
export class CreateCategoryDto {
  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  name: string;

  description?: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
export class UpdateCategoryDto {
  @IsOptional()
  slug?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class SearchDto {
  @MaxLength(50)
  @MinLength(2)
  @IsOptional()
  search?: string;

  @MinLength(2)
  @IsOptional()
  name?: string;

  @MinLength(2)
  @IsOptional()
  description?: string;

  @Max(9)
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  pageSize?: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  sort?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(
    ({ value }) =>
      value === "true" || value === "1" || value !== "false" || value !== "0",
  )
  active?: boolean = true;
}
