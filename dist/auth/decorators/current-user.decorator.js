"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = context.getArgByIndex(2);
    return ctx.req.user;
});
//# sourceMappingURL=current-user.decorator.js.map