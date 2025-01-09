import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class NotificationResponseDto {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  sentAt: Date;

  @Field({ nullable: true })
  readAt?: Date; 
}
