import { IsOptional, IsString, IsIn } from 'class-validator'

export class ItemQueryDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsString()
  @IsIn(['id', 'name', 'price']) 
  sortBy?: 'id' | 'name' | 'price'

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC']) 
  sortOrder?: 'ASC' | 'DESC'
}