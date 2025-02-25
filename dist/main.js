"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const stripe_1 = require("stripe");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Push Notification')
        .setDescription('The API details of the business solution for the Push Notification Demo Application.')
        .setVersion('1.0')
        .addTag('Notification')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {});
    const configSevice = app.get(config_1.ConfigService);
    const port = configSevice.get("APP_PORT");
    app.enableCors({
        origin: "http://localhost:3001"
    });
    app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map