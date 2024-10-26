import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {AchievementsModel} from "./achievements.model";
import {AchievementsService} from './achievements.service';
import {AchievementsController} from './achievements.controller';
import {UserAchievementService} from "../user-achievement/user-achievement.service";
import {UserAchievementModel} from "../user-achievement/user-achievement.model";
import {AchievementsCodeModel} from "../achievements-code/achievements-code.model";
import {UserMiddleware} from "../user/user.middleware";
import {UserController} from "../user/user.controller";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/user.model";

@Module({
    controllers: [AchievementsController],
    providers: [AchievementsService, UserAchievementService,JwtService],
    imports: [
        SequelizeModule.forFeature([AchievementsModel, UserAchievementModel, AchievementsCodeModel,User])
    ]
})
export class AchievementsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserMiddleware)
            .forRoutes({
                path: '/achievements/apply',
                method: RequestMethod.POST
            })
    }
}
