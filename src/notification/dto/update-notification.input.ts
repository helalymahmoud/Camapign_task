import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FindOperator } from 'typeorm';

@InputType()
export class UpdateNotificationDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  deviceToken: string;

  @Field({ nullable: true })
  @IsString()
  reason?: string; 
  device_type: string | FindOperator<string>;
}
