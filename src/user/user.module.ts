import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserMiddleware} from "./user.middleware";
import {JwtService} from "@nestjs/jwt";

@Module({
    providers: [UserService, JwtService],
    controllers: [UserController],
    imports: [
        SequelizeModule.forFeature([User])
    ],
    exports: [UserService]
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserMiddleware) // Применяем middleware
            .forRoutes(UserController)
    }
}
