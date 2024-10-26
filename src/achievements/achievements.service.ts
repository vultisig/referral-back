import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {AchievementsModel} from "./achievements.model";
import {CreateAchievementDto} from "./dto/create-achievement.dto";
import {Op} from "sequelize";

@Injectable()
export class AchievementsService {
    constructor(@InjectModel(AchievementsModel) private achievementsModel: typeof AchievementsModel) {
    }

    async getList({start, end}: { start: Date, end: Date }) {

        if (!start || !end) {
            throw new HttpException('Bad request', 500)
        }

        try {
            return await this.achievementsModel.findAll({
                where: {
                    [Op.or]: [
                        {

                            [Op.and]: [
                                {start_date: null},
                                {end_date: null}
                            ]
                        },
                        {

                            [Op.and]: [
                                {start_date: {[Op.gte]: start}},
                                {end_date: {[Op.lte]: end}}
                            ]
                        }
                    ]
                }
            });
        } catch (e) {
            return e
        }

    }

    createAchievement(data: CreateAchievementDto) {
        return this.achievementsModel.create(data)
    }

    createAchievementsBatch(data: CreateAchievementDto[]) {
        return this.achievementsModel.bulkCreate(data)
    }

    editAchievement(id: string, data: CreateAchievementDto) {
        return this.achievementsModel.update(data, {where: {id}})
    }

    deleteAchievement(id: string) {
        return this.achievementsModel.destroy({where: {id}})
    }


}
