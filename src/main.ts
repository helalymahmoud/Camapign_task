import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLExceptisonFilter } from './Exception/graphql-exception.filter';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Stripe from 'stripe';
import { json, urlencoded } from 'express';
import * as express from 'express';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new GraphQLExceptisonFilter());

  const config = new DocumentBuilder()
  .setTitle('Push Notification')
  .setDescription(
    'The API details of the business solution for the Push Notification Demo Application.',
  )
  .setVersion('1.0')
  .addTag('Notification')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
});

  const configSevice =app.get(ConfigService);
  const port =configSevice.get<number>("APP_PORT")
  app.enableCors({
    origin:"http://localhost:3001"
  })

  app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
  
  await app.listen(port);
}
bootstrap();
  