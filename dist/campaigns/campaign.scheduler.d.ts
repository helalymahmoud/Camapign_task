import { CampaignService } from './campaigns.service';
import { NotificationService } from 'src/notification/notification.service';
export declare class CampaignSchedulerService {
    private readonly campaignService;
    private readonly notificationService;
    constructor(campaignService: CampaignService, notificationService: NotificationService);
    notifyCampaigns(): void;
}
