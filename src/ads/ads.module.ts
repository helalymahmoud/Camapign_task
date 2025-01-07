import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignModule } from 'src/campaigns/campaigns.module';
import { Ad } from './entities/ads.entity';
import { AdResolver } from './ads.resolver';
import { AdService } from './ads.service';
import { DataloaderService } from 'src/dataloader/dataloader.service';
import { adRepository } from './ad.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ad,adRepository]), CampaignModule],
  providers: [AdService,AdResolver,DataloaderService,],
  exports:[DataloaderService]
  
})
export class AdModule {} 