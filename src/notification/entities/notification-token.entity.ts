import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class NotificationToken {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Field(() => User) 
  user: User;

  @Column()
  @Field()
  device_type: string;

  @Column()
  @Field()
  notification_token: string;

  @Column({
    default: 'ACTIVE',
  })
  @Field()
  status: string;
}
