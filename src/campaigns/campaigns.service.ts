 import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { CreateCampaignInput } from './dto/create-campaign.input'; 
import { Campaign } from './entities/campaign.entity';
import { title } from 'process';
import { SearchInput } from './dto/Search-Input.dto';
import { Args,  } from '@nestjs/graphql';
@Injectable()
export class CampaignService {
  adRepository: any;
  campaignService: any;
  adService: any;
  createQueryBuilder(arg0: string) {
    throw new Error('Method not implemented.');
  }
constructor(@InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>, 
  ) {}

  async getCampaignsStartingInNext24Hours(): Promise<Campaign[]> {
    const now = new Date(1);
    const tomorrow = new Date(1);
    tomorrow.setHours(now.getHours() + 24);
    return this.campaignRepository.find({
      where: {
      startDate: Between(now, tomorrow),
      },
      relations: ['users'], 
    }); 
  }
 
  async getCampaignsStartingNow(): Promise<Campaign[]> {
    const now = new Date();
    return this.campaignRepository.find({
        where: {
        startDate: LessThanOrEqual(now),
        endDate: MoreThan(now),
      },
      relations: ['users'],
    });
  }

  async searchCampaignsUsingFind(searchKey: string) {
    return await this.campaignRepository.find({
      where: [
        { description: ILike(`%${searchKey}%`) },
        { name: ILike(`%${searchKey}%`) },
        {status:ILike(`%${searchKey}%`)},
      ],
    });
  }


  async searchCampaigns(searchKey: string) {
    return await this.campaignRepository
      .createQueryBuilder('campaign')
      .where('campaign.description ILIKE :searchKey', { searchKey: `%${searchKey}%` })
      .orWhere('campaign.name ILIKE :searchKey', { searchKey: `%${searchKey}%` })
      .orWhere('campaign.endDate::text ILIKE :searchKey', { searchKey: `%${searchKey}%` })
      .orWhere('campaign.startDate::text ILIKE :searchKey', { searchKey: `%${searchKey}%` })
      .orWhere('campaign.status::text ILIKE :searchKey', { searchKey: `%${searchKey}%` })
      .getMany();
  }



  async search(@Args('input') input: SearchInput) {
    const { name } = input;

    const campaigns = await this.campaignService
      .createQueryBuilder('campaign')
      .where('campaign.name ILIKE :name', { name: `%${name}%` })
      .orwhere('campaign.description ILIKE :description',{description:`%{description}%`})
      .orwhere('campaign.status ILIKE :status',{status:`%{status}%`})
      .orwehre('campaign.startDate ILIKE :startDate',{startDate:`%{startDate}%`})
      .orwehre('campaign.endDate ILIKE :endDate',{endDate:`%{endDate}%`})
      .getMany();

      const ads = await this.adService
      .createQueryBuilder('ad')
      .where('ad.name ILIKE :name', { name: `%${name}%` })
      .orwhere('ad.title ILIKE :title', { title: `%${title}%` })
      .orwehre('ad.status ILIKE :status', { status: `%${status}%` })
      .getMany();

    return [...campaigns, ...ads];
  }
 
  
async findAll(pageMumber?:number,reviewPrePage?:number):Promise<Campaign[]>{
  return this.campaignRepository.find({
    skip:0, 
    take:0
  });
 }
  
async findOne(id: string): Promise<Campaign> {  
  return this.campaignRepository.findOne({where:{id}}); 
}

 async create(createCampaignInput: CreateCampaignInput): Promise<Campaign> {
    const campaign = this.campaignRepository.create(createCampaignInput);
    return this.campaignRepository.save(campaign);
  }

  async update(id: string, updateCampaignInput: CreateCampaignInput): Promise<Campaign> {
    await this.campaignRepository.update(id, updateCampaignInput); 
    return this.findOne(id); 
  }

  async remove (id:string):Promise<void>{
    await this.campaignRepository.delete(id)
  }    
}


  