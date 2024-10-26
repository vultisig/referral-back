import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AchievementsCodeService} from "./achievements-code.service";
import {CreateAchievementsCodeDto, CreateAchievementsCodeDtoSwagger} from "./dto/create-achievements-code.dto";
import {ApiBody, ApiParam, ApiProperty, ApiQuery, ApiTags} from "@nestjs/swagger";
import {ApiGuard} from "../global-guard/api/api.guard";
import {CreateAchievementsCodeManyDto} from "./dto/create-achievements-code-many.dto";

@Controller('achievements-code')
@ApiTags('achievements-code')
export class AchievementsCodeController {

    constructor(private service: AchievementsCodeService) {
    }

    @Get('/list')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    @ApiQuery({
        name: 'apiKey',
        type: 'string',
        description: 'vultisig api key',
        example: 'uweZLdPEiPc9YNRQJfs2LEH8KonEOk9hWDc8SxNKEBIM3dY2Nn3YE1PTPRC1owdf6TZMd2O37H3NrTocnVZJxMrLdJMWXmwEYadZY8thuwLfxYxd5pWxIrIWrSCrP1tc',
    })
    async getList() {
        return await this.service.getList()
    }

    @Post('/create')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    @ApiBody({type:CreateAchievementsCodeDtoSwagger})
    async createAchievementsCode(@Body() body: CreateAchievementsCodeDto) {
        return await this.service.createAchievementsCode(body)
    }

    @Post('/createMany')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    async createAchievementsBatch(@Body() body: CreateAchievementsCodeManyDto) {
        return await this.service.createAchievementsBatch(body.items)
    }

    @Delete('/delete/:id')
    @UseGuards(ApiGuard)
    @HttpCode(200)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                apiKey: {
                    type: 'string',
                    example: 'uweZLdPEiPc9YNRQJfs2LEH8KonEOk9hWDc8SxNKEBIM3dY2Nn3YE1PTPRC1owdf6TZMd2O37H3NrTocnVZJxMrLdJMWXmwEYadZY8thuwLfxYxd5pWxIrIWrSCrP1tc',
                },
            },
            required: ['apiKey'],
        },
    })
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
