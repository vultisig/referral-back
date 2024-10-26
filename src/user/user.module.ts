import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {UserMiddleware} from "./user.middleware";
import {JwtService} from "@nestjs/jwt";
import {UserAchievementService} from "../user-achievement/user-achievement.service";
import {UserAchievementModel} from "../user-achievement/user-achievement.model";
import {AchievementsModel} from "../achievements/achievements.model";
import {AchievementsCodeModel} from "../achievements-code/achievements-code.model";

@Module({
    providers: [UserService, JwtService, UserAchievementService],
    controllers: [UserController],
    imports: [
        SequelizeModule.forFeature([User,UserAchievementModel,AchievementsModel,AchievementsCodeModel]),
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
