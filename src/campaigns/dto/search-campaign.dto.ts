import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsDateString } from 'class-validator';

@InputType()
export class SearchCampaignDto {
  @Field({ nullable: true }) 
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
