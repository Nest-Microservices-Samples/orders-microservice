import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { Type } from 'class-transformer';

export class PaginationDto {

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    public page?: number = 1;


    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Min(5)
    @Type( () => Number )
    public limit?: number = 10;
}
