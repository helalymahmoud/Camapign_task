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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const campaigns_service_1 = require("./campaigns.service");
const notification_service_1 = require("../notification/notification.service");
let CampaignSchedulerService = class CampaignSchedulerService {
    constructor(campaignService, notificationService) {
        this.campaignService = campaignService;
        this.notificationService = notificationService;
    }
    notifyCampaigns() {
        console.log("******************");
    }
};
exports.CampaignSchedulerService = CampaignSchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CampaignSchedulerService.prototype, "notifyCampaigns", null);
exports.CampaignSchedulerService = CampaignSchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [campaigns_service_1.CampaignService,
        notification_service_1.NotificationService])
], CampaignSchedulerService);
//# sourceMappingURL=campaign.scheduler.js.map