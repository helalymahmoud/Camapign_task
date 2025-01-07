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
exports.SendMultipleNotificationsInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let SendMultipleNotificationsInput = class SendMultipleNotificationsInput {
};
exports.SendMultipleNotificationsInput = SendMultipleNotificationsInput;
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], SendMultipleNotificationsInput.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SendMultipleNotificationsInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SendMultipleNotificationsInput.prototype, "body", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SendMultipleNotificationsInput.prototype, "icon", void 0);
exports.SendMultipleNotificationsInput = SendMultipleNotificationsInput = __decorate([
    (0, graphql_1.InputType)()
], SendMultipleNotificationsInput);
//# sourceMappingURL=send-multiple-notifications.input.js.map