"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const notification_service_1 = require("./notification.service");
const campaigns_service_1 = require("../campaigns/campaigns.service");
let NotificationScheduler = NotificationScheduler_1 = class NotificationScheduler {
    constructor(notificationService, campaignService) {
        this.notificationService = notificationService;
        this.campaignService = campaignService;
        this.logger = new common_1.Logger(NotificationScheduler_1.name);
    }
    async notifyBeforeCampaignStart() {
        this.logger.log('Checking for campaigns starting in 24 hours...');
        const campaigns = await this.campaignService.getCampaignsStartingInNext24Hours();
        for (const campaign of campaigns) {
            for (const userId of campaign.users) {
                await this.notificationService.sendNotification(userId, `Upcoming Campaign: ${campaign.name}`, `The campaign "${campaign.name}" will start in less than 24 hours.`);
            }
        }
    }
};
exports.NotificationScheduler = NotificationScheduler;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_NOON),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationScheduler.prototype, "notifyBeforeCampaignStart", null);
exports.NotificationScheduler = NotificationScheduler = NotificationScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        campaigns_service_1.CampaignService])
], NotificationScheduler);
//# sourceMappingURL=notification.scheduler.js.map