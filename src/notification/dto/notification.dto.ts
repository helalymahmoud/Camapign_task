import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class NotificationDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  body: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  deviceToken: string;
  device_type: any;
  notification_token: any;
}
