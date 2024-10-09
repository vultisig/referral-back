import {Body, Controller, Get, HttpCode, HttpException, Post, Req, UseGuards,} from '@nestjs/common';
import {ExternalApiService} from "./external-api.service";
import {ExternalUsersDto} from "./dto/external-users.dto";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ApiGuard} from "../global-guard/api/api.guard";
import {CheckUserStatusDto} from "../auth/dto/check-user-status.dto";

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

    @Post('/checkStatus')
    @ApiBody({type: CheckUserStatusDto})
    @ApiOperation({summary: 'Get user airdrop status'})
    @ApiResponse({
        status: 200,
        schema: {
            type: 'object',
            properties: {
                status: {
                    type: 'boolean'
                }
            }
        }
    })
    @HttpCode(200)
    async checkUserAirdropStatus(@Body('uuid') uuid: string): Promise<{ status: boolean } | HttpException> {
        return await this.externalApiService.checkUserAirdropStatus(uuid)
    }

    @Post('/join')
    @ApiBody({type: CheckUserStatusDto})
    @ApiOperation({summary: 'Join to airdrop'})
    @ApiResponse({
        status: 200,
        schema: {
            type: 'object',
            properties: {
                join_airdrop: {
                    type: 'boolean'
                }
            }
        }
    })
    @HttpCode(200)
    async joinToAirdrop(@Body('uuid') uuid: string): Promise<{ join_airdrop: boolean } | HttpException> {
        return await this.externalApiService.joinToAirdrop(uuid)
    }
}
