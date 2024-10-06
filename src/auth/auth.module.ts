import {Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UserModule} from "../user/user.module";
import {TelegramBotModule} from "../telegram-bot/telegram-bot.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {ConfigModule, ConfigService} from "@nestjs/config";

console.log('ssss',process.env.JWT_SECRET)

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UserModule,
        TelegramBotModule,
        ConfigModule.forRoot(), // Для загрузки переменных окружения
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60m' }, // Время жизни токена
            }),
        }),
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {
}
