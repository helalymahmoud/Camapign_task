"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const jwt_decodeToken_1 = require("../guards/jwt-decodeToken");
const jwt_1 = require("@nestjs/jwt");
exports.CurrentUser = (0, common_1.createParamDecorator)(async (data, context) => {
    const gqlContext = context.getArgByIndex(2);
    const authHeader = gqlContext.req.headers['authorization'];
    console.log("Authorization Header:", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new common_1.UnauthorizedException('Authorization header is missing or invalid');
    }
    const token = authHeader.split(' ')[1];
    const jwtService = new jwt_1.JwtService({ secret: 'secretKey' });
    const tokenService = new jwt_decodeToken_1.TokenService(jwtService);
    let userData;
    try {
        userData = tokenService.decodeToken(token);
    }
    catch (error) {
        throw new common_1.UnauthorizedException('Invalid token');
    }
    console.log("Decoded User Data:", userData);
    return userData;
});
//# sourceMappingURL=current-user.decorator.js.map