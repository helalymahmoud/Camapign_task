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
exports.ProductType = void 0;
const graphql_1 = require("@nestjs/graphql");
let ProductType = class ProductType {
};
exports.ProductType = ProductType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductType.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ProductType.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductType.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ProductType.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ProductType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ProductType.prototype, "updatedAt", void 0);
exports.ProductType = ProductType = __decorate([
    (0, graphql_1.ObjectType)()
], ProductType);
//# sourceMappingURL=product.type.js.map