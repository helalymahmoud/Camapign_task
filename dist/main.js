"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configSevice = app.get(config_1.ConfigService);
    const port = configSevice.get("APP_PORT");
    app.enableCors({
        origin: "http://localhost:3001"
    });
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map