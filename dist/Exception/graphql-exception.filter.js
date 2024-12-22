"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLExceptisonFilter = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const console_1 = require("console");
const express_1 = require("express");
let GraphQLExceptisonFilter = class GraphQLExceptisonFilter {
    constructor() {
        this.localRes = {
            message: ' errorrrrrrrs',
            success: false,
            code: 504
        };
    }
    catch(exception, host) {
        console.log('HttpException detected:', express_1.response);
        const context = graphql_1.GqlArgumentsHost.create(host).getContext();
        if (exception instanceof common_1.HttpException) {
            (0, console_1.log)(exception);
            (0, console_1.log)(!!context.res);
            return this.localRes;
        }
        return this.localRes;
    }
};
exports.GraphQLExceptisonFilter = GraphQLExceptisonFilter;
exports.GraphQLExceptisonFilter = GraphQLExceptisonFilter = __decorate([
    (0, common_1.Catch)()
], GraphQLExceptisonFilter);
//# sourceMappingURL=graphql-exception.filter.js.map