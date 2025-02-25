import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType() 
@Entity()
export class Message {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  senderId: string;

  @Field()
  @Column()
  receiverId: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiver: User;
}
