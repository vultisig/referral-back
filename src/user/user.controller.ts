import {Body, Controller, Get, HttpCode, Post, Req, UseGuards, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {ChangeWalletDto} from "./dto/change-wallet.dto";
import {ApiBody,ApiQuery, ApiTags} from "@nestjs/swagger";
import {ApiGuard} from "../global-guard/api/api.guard";
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

  @Get('/referrals')
  @UseGuards(ApiGuard)
  @HttpCode(200)
  @ApiQuery({
    name: 'apiKey',
    type: 'string',
    description: 'vultisig api key',
    example:
      'uweZLdPEiPc9YNRQJfs2LEH8KonEOk9hWDc8SxNKEBIM3dY2Nn3YE1PTPRC1owdf6TZMd2O37H3NrTocnVZJxMrLdJMWXmwEYadZY8thuwLfxYxd5pWxIrIWrSCrP1tc',
  })
  @ApiQuery({ name: 'skip', type: 'number', required: false })
  @ApiQuery({ name: 'take', type: 'number', required: false })
  async SelectAllUsers(
    @Query('eddsaKey') eddsa: string = '',
    @Query('ecdsaKey') ecdsa: string = '',
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ) {
    return await this.userService.getAllUsersReferrals(
      eddsa,
      ecdsa,
      skip,
      take,
    );
  }
}
