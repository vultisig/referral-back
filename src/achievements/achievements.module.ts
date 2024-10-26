import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {AchievementsModel} from "./achievements.model";
import {AchievementsService} from './achievements.service';
import {AchievementsController} from './achievements.controller';
import {UserAchievementService} from "../user-achievement/user-achievement.service";
import {UserAchievementModel} from "../user-achievement/user-achievement.model";
import {AchievementsCodeModel} from "../achievements-code/achievements-code.model";

@Module({
    controllers: [AchievementsController],
    providers: [AchievementsService, UserAchievementService],
    imports: [
        SequelizeModule.forFeature([AchievementsModel, UserAchievementModel, AchievementsCodeModel])
    ]
})
export class AchievementsModule {

}
