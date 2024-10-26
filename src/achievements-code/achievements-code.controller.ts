import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';
import {AchievementsCodeService} from "./achievements-code.service";
import {CreateAchievementsCodeDto} from "./dto/create-achievements-code.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('achievements-code')
@ApiTags('achievements-code')
export class AchievementsCodeController {

    constructor(private service:AchievementsCodeService) {
    }

    @Get('/list')
    @HttpCode(200)
    async getList() {
        return await this.service.getList()
    }

    @Post('/create')
    @HttpCode(200)
    async createAchievementsCode(@Body() body: CreateAchievementsCodeDto) {
        return await this.service.createAchievementsCode(body)
    }

    @Post('/createMany')
    @HttpCode(200)
    async createAchievementsBatch(@Body() body: CreateAchievementsCodeDto[]) {
        return await this.service.createAchievementsBatch(body)
    }

    @Post('/delete/:id')
    @HttpCode(200)
    async deleteAchievementsCode(@Param('id') id: string) {
        return await this.service.deleteAchievementsCode(id)
    }

    @Post('/edit/:id')
    @HttpCode(200)
    async editAchievementsCode(@Param('id') id: string, @Body() body: CreateAchievementsCodeDto) {
        return await this.service.editAchievementsCode(id, body)
    }




}
