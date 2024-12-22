"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adRepository = void 0;
const data_1 = require("../data");
class adRepository {
    async AdsByCampaignIds(campaignId) {
        console.log(`SELECT * FROM ads WHERE campaignId IN (${campaignId.join(',')})`);
        return data_1.ads.filter((ad) => campaignId.includes(ad.campaignId));
    }
}
exports.adRepository = adRepository;
//# sourceMappingURL=ad.repository.js.map