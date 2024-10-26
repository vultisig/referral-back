import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {AchievementsCodeModel} from "./achievements-code.model";
import { AchievementsCodeService } from './achievements-code.service';
import { AchievementsCodeController } from './achievements-code.controller';

@Module({
    controllers: [AchievementsCodeController],
    providers: [AchievementsCodeService],
    imports: [SequelizeModule.forFeature([
        AchievementsCodeModel
    ])],
})
export class AchievementsCodeModule {}
