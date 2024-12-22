import { Field, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class  PaginationDto{

    @Field(() => Int, { defaultValue: 0 })
    @IsNumber()
    skip:number;

  
    @Field(() => Int, { defaultValue: 10 })
    @IsNumber()
    limit:number;
}