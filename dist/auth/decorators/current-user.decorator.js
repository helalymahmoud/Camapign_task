"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentUser = (0, common_1.createParamDecorator)((fieldName, ctx) => {
    const gqlCtx = graphql_1.GqlExecutionContext.create(ctx);
    const { currentUser } = gqlCtx.getContext();
    if (!currentUser)
        return false;
    if (fieldName)
        return currentUser[fieldName];
    return currentUser;
});
//# sourceMappingURL=current-user.decorator.js.map