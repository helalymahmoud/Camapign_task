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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const sales_service_1 = require("./sales.service");
const sales_summary_type_1 = require("./input/sales-summary.type");
const TransactionType_1 = require("./input/TransactionType");
let SalesResolver = class SalesResolver {
    constructor(salesService) {
        this.salesService = salesService;
    }
    async getTotalSales(startDate, endDate) {
        return this.salesService.getTotalSales(startDate, endDate);
    }
    async getAllTransactions(limit, startingAfter) {
        return this.salesService.getAllTransactions(limit ?? 100, startingAfter);
    }
};
exports.SalesResolver = SalesResolver;
__decorate([
    (0, graphql_1.Query)(() => sales_summary_type_1.SalesSummaryType),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SalesResolver.prototype, "getTotalSales", null);
__decorate([
    (0, graphql_1.Query)(() => [TransactionType_1.TransactionType]),
    __param(0, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('startingAfter', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], SalesResolver.prototype, "getAllTransactions", null);
exports.SalesResolver = SalesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], SalesResolver);
//# sourceMappingURL=sales.resolver.js.map