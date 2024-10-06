import {Body, Controller, Get, HttpCode, Post, Req} from '@nestjs/common';
import {UserService} from "./user.service";
import {ChangeWalletDto} from "./dto/change-wallet.dto";
import {ApiBody, ApiTags} from "@nestjs/swagger";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('/changeWallet')
    @HttpCode(200)
    @ApiBody({type: ChangeWalletDto})
    async changeWallet(
        @Req() req,
        @Body() changeWalletDto: ChangeWalletDto
    ) {
        return await this.userService.changeUserWallet(req.user, changeWalletDto);
    }

    @Get('/me')
    @HttpCode(200)
    async getMe(@Req() req,) {
        return await this.userService.getMe(req.user)
    }

    @Get('/referrals')
    @HttpCode(200)
    async getReferrals(@Req() req, skip: number = 0, take: number = 10) {
        return await this.userService.getUsersReferrals(req.user, skip, take)
    }


}
