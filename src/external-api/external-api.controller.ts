import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
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
}
