import {Body, Controller, Get, HttpCode, Post, Req, UseGuards,} from '@nestjs/common';
import {ExternalApiService} from "./external-api.service";
import {ExternalUsersDto} from "./dto/external-users.dto";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {ApiGuard} from "../global-guard/api/api.guard";

@Controller('external-api')
@ApiTags('external-api')
export class ExternalApiController {
    constructor(private externalApiService: ExternalApiService) {
    }

    @UseGuards(ApiGuard)
    @Post('/users')
    @HttpCode(200)
    @ApiBody({type: ExternalUsersDto})
    async getUsers(@Body('skip') skip: number = 0, @Body('take') take: number = 10) {
        return await this.externalApiService.getUsers();
    }

    @Get('/getVASUser')
    @HttpCode(200)
    async getVASUser(@Req() req) {
        return await this.externalApiService.getUSerFromVAS(req.user)
    }
    @Post('/putUserToVAS')
    @HttpCode(200)
    async putUserToVAS(@Req() req) {
        return await this.externalApiService.putUserToVAS(req.user)
    }
}
