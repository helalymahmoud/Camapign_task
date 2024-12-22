import { ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
export declare class GraphQLExceptisonFilter implements GqlExceptionFilter {
    private localRes;
    catch(exception: any, host: ArgumentsHost): {
        message: string;
        success: boolean;
        code: number;
    };
}
