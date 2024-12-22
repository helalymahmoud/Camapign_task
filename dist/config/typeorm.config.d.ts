import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
export default class TypeOrmConfig {
    static getOrmConfig(configSevice: ConfigService): TypeOrmModuleOptions;
}
export declare const typeOrmConfigAsync: TypeOrmModuleAsyncOptions;
