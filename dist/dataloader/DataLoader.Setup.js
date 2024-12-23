"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoaders = createLoaders;
const DataLoader = require("dataloader");
function createLoaders(adService) {
    return {
        adsLoader: new DataLoader(async (campaignIds) => {
            return await adService.CampaignAdsByBatch(campaignIds);
        }),
    };
}
//# sourceMappingURL=DataLoader.Setup.js.map