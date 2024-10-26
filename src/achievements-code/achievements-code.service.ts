import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {AchievementsCodeModel} from "./achievements-code.model";
import {CreateAchievementsCodeDto} from "./dto/create-achievements-code.dto";

@Injectable()
export class AchievementsCodeService {

    constructor(@InjectModel(AchievementsCodeModel) private model: typeof AchievementsCodeModel) {
    }

    async getList() {
        return await this.model.findAll()
    }

    async createAchievementsCode(data: CreateAchievementsCodeDto) {

        const existingCode = await this.model.findOne({
            where: {
                code: data.code,
            },
            rejectOnEmpty: false
        })

        if (existingCode) {
            throw new HttpException('Code already exists', 400)
        }

        return await this.model.create(data)
    }

    async createAchievementsBatch(data: CreateAchievementsCodeDto[]) {

        const codes = data.map(item => item.code);

        const existingCodes = await this.model.findAll({
            where: {
                code: codes,
            },
            attributes: ['code'],
        });

        const existingCodeValues = new Set(existingCodes.map(item => item.code));

        const uniqueData = data.filter(item => !existingCodeValues.has(item.code));

        return await this.model.bulkCreate(uniqueData);
    }

    async deleteAchievementsCode(id: string) {
        return await this.model.destroy({
            where: {
                id
            }
        })
    }

    async editAchievementsCode(id: string, data: CreateAchievementsCodeDto) {
        return await this.model.update(data, {
            where: {
                id
            },
            returning: true
        })
    }
}
