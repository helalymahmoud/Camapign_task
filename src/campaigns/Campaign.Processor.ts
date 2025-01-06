import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CampaignService } from './campaigns.service';

@Processor('campaignQueue')
export class CampaignProcessor {
  constructor(private readonly campaignService: CampaignService) {}

  @Process('createCampaign')
  async handleCreateCampaign(job: Job) {
    const { createCampaignInput } = job.data;
    return await this.campaignService.create(createCampaignInput);  
  }

  @Process('updateCampaign')
  async handleUpdateCampaign(job: Job) {
    const { id, updateCampaignInput } = job.data;
    return await this.campaignService.update(id, updateCampaignInput);  
  }
}
