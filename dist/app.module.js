"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const jwt = require("jsonwebtoken");
const app_service_1 = require("./app.service");
const campaigns_module_1 = require("./campaigns/campaigns.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const users_module_1 = require("./users/users.module");
const ads_entity_1 = require("./ads/entities/ads.entity");
const campaign_entity_1 = require("./campaigns/entities/campaign.entity");
const Partner_entity_1 = require("./Partners/entites/Partner.entity");
const user_entity_1 = require("./users/entities/user.entity");
const tickets_entity_1 = require("./tickets/entities/tickets.entity");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const ads_module_1 = require("./ads/ads.module");
const partner_module_1 = require("./Partners/partner.module");
const ticket_module_1 = require("./tickets/ticket.module");
const ads_interaction_entity_1 = require("./ads-interaction/ads-interaction.entity");
const dataloader_module_1 = require("./dataloader/dataloader.module");
const dataloader_service_1 = require("./dataloader/dataloader.service");
const core_1 = require("@nestjs/core");
const graphql_exception_filter_1 = require("./Exception/graphql-exception.filter");
const queue_module_1 = require("./queue/queue.module");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const notification_module_1 = require("./notification/notification.module");
const payment_module_1 = require("./stripe/payment.module");
const product_module_1 = require("./product/product.module");
const coupon_module_1 = require("./Coupon/coupon.module");
const promo_code_module_1 = require("./promocode/promo-code.module");
const sales_module_1 = require("./sales/sales.module");
const review_module_1 = require("./Review/review.module");
const message_module_1 = require("./chat/message.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                imports: [dataloader_module_1.DataloaderModule, auth_module_1.AuthModule],
                useFactory: (dataloaderService, authService) => ({
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                    playground: true,
                    subscriptions: {
                        'graphql-ws': true,
                    },
                    context: async ({ req, connection }) => {
                        if (connection) {
                            return connection.context;
                        }
                        let currentUser = null;
                        if (req?.headers.authorization) {
                            try {
                                const token = req.headers.authorization.split(' ')[1];
                                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                                currentUser = await authService.validateUserById(decodedToken.id);
                            }
                            catch (error) {
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
                inject: [dataloader_service_1.DataloaderService, auth_service_1.AuthService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmConfigAsync),
            campaigns_module_1.CampaignModule,
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([campaign_entity_1.Campaign, ads_entity_1.Ad, Partner_entity_1.Partner, user_entity_1.User, tickets_entity_1.Ticket, ads_interaction_entity_1.AdInteraction]),
            notification_module_1.NotificationModule,
            auth_module_1.AuthModule,
            ads_module_1.AdModule,
            partner_module_1.PartnerModule,
            ticket_module_1.TicketModule,
            dataloader_module_1.DataloaderModule,
            queue_module_1.QueueModule,
            mailer_1.MailerModule,
            payment_module_1.PaymentModule,
            product_module_1.ProductModule,
            coupon_module_1.CouponModule,
            promo_code_module_1.PromoCodeModule,
            sales_module_1.SalesModule,
            review_module_1.ReviewModule,
            message_module_1.MessageModule
        ],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: graphql_exception_filter_1.GraphQLExceptisonFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map