import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserAchievementModel} from "./user-achievement.model";
import {AchievementsCodeModel} from "../achievements-code/achievements-code.model";
import {AchievementsModel} from "../achievements/achievements.model";

@Injectable()
export class UserAchievementService {

    constructor(
        @InjectModel(UserAchievementModel) private model: typeof UserAchievementModel,
        @InjectModel(AchievementsCodeModel) private codeModel: typeof AchievementsCodeModel,
        @InjectModel(AchievementsModel) private achievementModel: typeof AchievementsModel
    ) {
    }

    async getUserAchievements(user_id: string, skip: number = 0, take: number = 10) {
        return await this.model.findAll({
            where: {
                user_id: user_id,
            },
            offset: skip,
            limit: take
        })
    }

    async applyAchievement(user_id: string, code: string) {
        if (!code) {
            throw new HttpException('Code is required', 500)
        }
        const trimCode = code.trim()
        const achievementCode = await this.codeModel.findOne({
            where: {
                code: trimCode,
                user_id: null,
            },
            rejectOnEmpty: false
        });
        if (!achievementCode) {
            throw new HttpException('No achievement code found', 424);
        }

        const achievement = await this.achievementModel.findOne({
            where: {
                id: achievementCode.achievement_id,
            },
            rejectOnEmpty: false
        });

        if (!achievement || (achievement.end_date && new Date(achievement.end_date) < new Date()) ||
            (achievement.start_date && new Date(achievement.start_date) > new Date())) {
            throw new HttpException('No achievement found or achievement is inactive', 423);
        }

        const userAchievement = await this.model.findOne({
            where: {
                user_id: user_id,
                achievement_id: achievement.id,
            },
            rejectOnEmpty: false
        });

        if (!userAchievement) {
            const code = await this.codeModel.update(
                {user_id: user_id , used_date: new Date().toISOString()},
                {where: {id: achievementCode.id}},
            );

            await this.model.create({
                user_id: user_id,
                achievement_id: achievement.id,
                code: achievementCode.code,

            })
            return await this.achievementModel.findOne(
                {
                    where: {id: achievement.id},
                    rejectOnEmpty: false
                }
            )

        } else {
            // Если достижение уже есть
            return {status: 420, message: 'Achievement already applied'};
        }


    }


}
