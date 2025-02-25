import { ObjectType, Field } from "@nestjs/graphql";
import { Ad } from "src/ads/entities/ads.entity";
import { Campaign } from "src/campaigns/entities/campaign.entity";
import { Message } from "src/chat/Entity/message.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";

@Entity()
@ObjectType()
export class User {
  static findOne(arg0: { where: { id: string; }; }) {
    throw new Error('Method not implemented.');
  }
  [x: string]: any;
  @Field(()=>String)
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Field(()=>String)
  @Column()
  name: string; 

  @Field(()=>String)
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string; 
  
  @Column({ nullable: true })
  fcmToken: string; 


  @Field(() => [Campaign])
  @ManyToMany(() => Campaign, (campaign) => campaign.users)
  joinedCampaigns: Campaign[];
    tickets: any;

  @ManyToMany(()=>Ad,(ads)=>ads.users)
    ads:Ad [];

  @Column({ nullable: true })
  otp: string; 

  @Column({ type: 'timestamp', nullable: true })
  otpExpiresAt: Date; 
  

  @Column({nullable:true})
  resetPasswordToken:string


  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpiresAt: Date;

  @Column({
    default: 'ACTIVE',
  })
  status: string;







  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
  


  
      

}



