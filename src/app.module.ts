import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as jwt from 'jsonwebtoken'; 
import { AppService } from './app.service';
import { CampaignModule } from './campaigns/campaigns.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { Ad } from './ads/entities/ads.entity';
import { Campaign } from './campaigns/entities/campaign.entity';
import { Partner } from './Partners/entites/Partner.entity';
import { User } from './users/entities/user.entity';
import { Ticket } from './tickets/entities/tickets.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AdModule } from './ads/ads.module';
import { PartnerModule } from './Partners/partner.module';
import { TicketModule } from './tickets/ticket.module';
import { AdInteraction } from './ads-interaction/ads-interaction.entity';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataloaderService } from './dataloader/dataloader.service';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptisonFilter } from './Exception/graphql-exception.filter';
import { BullModule } from '@nestjs/bullmq';
import { QueueModule } from './queue/queue.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './stripe/payment.module';
import { ProductModule } from './product/product.module';
import { CouponModule } from './Coupon/coupon.module';
import { PromoCodeModule } from './promocode/promo-code.module';
import { SalesModule } from './sales/sales.module';
import { ReviewModule } from './Review/review.module';
import { MessageModule } from './chat/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule, AuthModule],
      useFactory: (dataloaderService: DataloaderService, authService: AuthService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        playground: true,
        subscriptions: {
          'graphql-ws': true, 
        },
        context: async ({ req, connection }) => {
          if (connection) {
            return connection.context; 
          }

          let currentUser: User = null;
          if (req?.headers.authorization) {
            try {
              const token = req.headers.authorization.split(' ')[1];
              const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
              currentUser = await authService.validateUserById(decodedToken.id);
            } catch (error) {
              console.error('Error verifying token:', error);
            }
          }

          return { req, currentUser, loaders: dataloaderService.getLoaders() };
        },
        formatError: (err) => ({
          message: err.message,
          status: err.extensions.code,
          timestamp: new Date().toISOString(),
        }),
      }),
      inject: [DataloaderService, AuthService],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    CampaignModule,
    UsersModule,
    TypeOrmModule.forFeature([Campaign, Ad, Partner, User, Ticket, AdInteraction]),
    NotificationModule,
    AuthModule,
    AdModule,
    PartnerModule,
    TicketModule,
    DataloaderModule,
    QueueModule,
    MailerModule,
    PaymentModule,
    ProductModule,
    CouponModule,
    PromoCodeModule,
    SalesModule,
    ReviewModule,
    // AuthModule,
    MessageModule
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptisonFilter,
    },
  ],
})
export class AppModule {}
