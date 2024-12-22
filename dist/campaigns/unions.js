"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResultUnion = void 0;
const graphql_1 = require("@nestjs/graphql");
const ads_entity_1 = require("../ads/entities/ads.entity");
const campaign_entity_1 = require("./entities/campaign.entity");
exports.SearchResultUnion = (0, graphql_1.createUnionType)({
    name: 'SearchResultUnion',
    types: () => [campaign_entity_1.Campaign, ads_entity_1.Ad],
    resolveType(value) {
        if ('description' in value) {
            return campaign_entity_1.Campaign;
        }
        if ('title' in value) {
            return ads_entity_1.Ad;
        }
        return null;
    },
});
//# sourceMappingURL=unions.js.map