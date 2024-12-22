"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfigAsync = void 0;
const config_1 = require("@nestjs/config");
class TypeOrmConfig {
    static getOrmConfig(configSevice) {
        return {
            type: 'postgres',
            host: configSevice.get('DB_HOST'),
            port: configSevice.get('DB_PORRT'),
            username: configSevice.get('DB_USERNAME'),
            password: configSevice.get('DB_PASSWORD'),
            database: configSevice.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true
        };
    }
}
exports.default = TypeOrmConfig;
exports.typeOrmConfigAsync = {
    imports: [config_1.ConfigModule],
    useFactory: async (ConfigService) => TypeOrmConfig.
        getOrmConfig(ConfigService),
    inject: [config_1.ConfigService]
};
//# sourceMappingURL=typeorm.config.js.map