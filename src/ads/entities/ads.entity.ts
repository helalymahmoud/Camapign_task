import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, DropDatabaseOptions, ManyToOne, } from "typeorm";
import { Campaign } from "src/campaigns/entities/campaign.entity";
import { User } from "src/users/entities/user.entity";
import { Partner } from "src/Partners/entites/Partner.entity";

@Entity()
@ObjectType()
export class Ad {

  [x: string]: any;
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  campaigned: string; 

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column() 
  status: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.ads)
  campaigns: Campaign[];
  

  @ManyToMany(()=>User,(User)=> User.ads)
  users:User[];


  @ManyToMany (()=>Partner,(Partner)=>Partner.ads)
  partners:Partner[];





}
