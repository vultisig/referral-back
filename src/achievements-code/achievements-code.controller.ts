import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AchievementsCodeService} from "./achievements-code.service";
import {CreateAchievementsCodeDto} from "./dto/create-achievements-code.dto";
import {ApiTags} from "@nestjs/swagger";
import {ApiGuard} from "../global-guard/api/api.guard";

@Controller('achievements-code')
@ApiTags('achievements-code')
export class AchievementsCodeController {

    constructor(private service:AchievementsCodeService) {
    }

    @Get('/list')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async getList() {
        return await this.service.getList()
    }

    @Post('/create')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async createAchievementsCode(@Body() body: CreateAchievementsCodeDto) {
        return await this.service.createAchievementsCode(body)
    }

    @Post('/createMany')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async createAchievementsBatch(@Body() body: CreateAchievementsCodeDto[]) {
        return await this.service.createAchievementsBatch(body)
    }

    @Delete('/delete/:id')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async deleteAchievementsCode(@Param('id') id: string) {
        return await this.service.deleteAchievementsCode(id)
    }

    @Put('/edit/:id')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async editAchievementsCode(@Param('id') id: string, @Body() body: CreateAchievementsCodeDto) {
        return await this.service.editAchievementsCode(id, body)
    }




}
