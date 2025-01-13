import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { NotificationToken } from './notification-token.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Notifications {
  @PrimaryGeneratedColumn()
  @Field(()=>String)
  id: string;

  @ManyToOne(() => NotificationToken)
  @JoinColumn({ name: 'notification_token_id', referencedColumnName: 'id' })
  @Field(() => NotificationToken) 
  notification_token: NotificationToken;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  body: string; 
  @Column()
  created_by: string;
 
  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
