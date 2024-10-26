import {Body, Controller, Get, HttpCode, Post, Req} from '@nestjs/common';
import {UserService} from "./user.service";
import {ChangeWalletDto} from "./dto/change-wallet.dto";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {UserAchievementService} from "../user-achievement/user-achievement.service";
import {GetUserAchievementDto} from "../user-achievement/dto/get-user-achievement.dto";


@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private userService: UserService,
                private achievementService: UserAchievementService
    ) {
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

    @Post('/referrals')
    @HttpCode(200)
    async getReferrals(@Req() req, @Body('skip') skip: number = 0, @Body('take') take: number = 10) {
        return await this.userService.getUsersReferrals(req.user, skip, take)
    }

    @Post('/achievements')
    @HttpCode(200)
    async getUserAchievements(@Req() req, @Body() {skip, take}: GetUserAchievementDto) {
        return await this.achievementService.getUserAchievements(req.user.uuid, skip, take)
    }


}
