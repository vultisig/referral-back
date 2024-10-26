import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserAchievementModel} from "./user-achievement.model";
import {UserAchievementService} from './user-achievement.service';
import {AchievementsModel} from "../achievements/achievements.model";
import {AchievementsCodeModel} from "../achievements-code/achievements-code.model";

@Module({
    controllers: [],
    providers: [UserAchievementService],
    imports: [SequelizeModule.forFeature([UserAchievementModel, AchievementsModel, AchievementsCodeModel])],
    exports: [UserAchievementService],
})
export class UserAchievementModule {
}
