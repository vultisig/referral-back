import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {ExternalApiController} from "./external-api.controller";
import {ExternalApiService} from "./external-api.service";
import {User} from "../user/user.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {HttpModule} from "@nestjs/axios";
import {JwtService} from "@nestjs/jwt";
import {UserMiddleware} from "../user/user.middleware";


@Module({
    controllers: [ExternalApiController],
    providers: [ExternalApiService, JwtService],
    imports: [
        SequelizeModule.forFeature([User]),
        HttpModule.register({
            timeout: 5000
        })
    ]
})
export class ExternalApiModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserMiddleware) // Применяем middleware
            .forRoutes({
                path: '/external-api/getVASUser',
                method: RequestMethod.GET
            }, {path: '/external-api/putUserToVAS', method: RequestMethod.POST}, {
                path: '/external-api/join',
                method: RequestMethod.POST
            })
    }
}
