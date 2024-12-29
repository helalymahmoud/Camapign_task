import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


@InputType()
export class LoginDto {

  @Field()
  email: string;

  
  @Field()
  password: string;
}
