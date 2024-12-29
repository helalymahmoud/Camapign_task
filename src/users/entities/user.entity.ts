import { ObjectType, Field } from "@nestjs/graphql";
import { Ad } from "src/ads/entities/ads.entity";
import { Campaign } from "src/campaigns/entities/campaign.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity()
@ObjectType()
export class User {
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
}



