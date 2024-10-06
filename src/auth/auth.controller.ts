import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {AuthUserDto} from "./dto/auth-user.dto";

@Controller()
@ApiTags('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/auth')
    @HttpCode(200)
    login(@Body() dto: AuthUserDto) {
        return this.authService.login(dto);
    }

}
