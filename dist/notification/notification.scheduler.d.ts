import { NotificationService } from './notification.service';
import { CampaignService } from 'src/campaigns/campaigns.service';
export declare class NotificationScheduler {
    private readonly notificationService;
    private readonly campaignService;
    private readonly logger;
    constructor(notificationService: NotificationService, campaignService: CampaignService);
    notifyBeforeCampaignStart(): Promise<void>;
}
