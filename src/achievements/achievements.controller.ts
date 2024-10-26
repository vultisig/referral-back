import {Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiBody, ApiProperty, ApiTags} from "@nestjs/swagger";
import {AchievementsService} from "./achievements.service";
import {CreateAchievementDto} from "./dto/create-achievement.dto";
import {GetAchievementDto} from "./dto/get-achievement.dto";
import {UserAchievementService} from "../user-achievement/user-achievement.service";
import {ApiGuard} from "../global-guard/api/api.guard";

@Controller('achievements')
@ApiTags('achievements')
export class AchievementsController {
    constructor(
        private achievementsService: AchievementsService,
        private userAchievementService: UserAchievementService) {
    }

    @Post('/list')
    @HttpCode(200)

    async getList(@Body() body: GetAchievementDto): Promise<any> {
        return await this.achievementsService.getList({
            start: body.start_date__gte,
            end: body.end_date__lte
        })
    }

    @Post('/create')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async createAchievement(@Body() body: CreateAchievementDto) {
        return await this.achievementsService.createAchievement(body)
    }

    @Post('/createMany')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    @ApiBody({type: [CreateAchievementDto]})

    async createAchievementsBatch(@Body() body: CreateAchievementDto[]): Promise<any> {
        return await this.achievementsService.createAchievementsBatch(body)
    }

    @Put('/edit/:id')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async editAchievement(@Body() body: CreateAchievementDto, @Param('id') id: string) {
        return await this.achievementsService.editAchievement(id, body)
    }

    @Delete('/delete/:id')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async deleteAchievement(@Param('id') id: string) {
        return await this.achievementsService.deleteAchievement(id)
    }

    @Post('/apply')
    @HttpCode(200)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                    example: 'ws_we23-1', // Пример значения
                },
            },
            required: ['code'], // Обязательное поле
        },
    })
    async applyAchievement(@Req() req, @Body('code') code: string) {
        return await this.userAchievementService.applyAchievement(req.user.uuid, code)
    }


}
