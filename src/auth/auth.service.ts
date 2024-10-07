import {HttpException, Injectable} from '@nestjs/common';
import {User} from "../user/user.model";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {AuthUserDto} from "./dto/auth-user.dto";
import * as process from "process";
import {TelegramBotService} from "../telegram-bot/telegram-bot.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private telegramBotService: TelegramBotService
    ) {
    }

    async login(dto: AuthUserDto) {
        const data = await this.getInitialData(dto);
        const user = await this.userService.getUserByTelegramId(data.userData.id);

        if (user) {
            return {
                token: await this.generateToken(user),
                user: user
            }
        }

        return process.env.CREATE_USER_VIA_REF_ONLY === 'true'
            ? await this.createUserViaRefOnly(data)
            : await this.createUser(data);


    }


    private async generateToken(user: User) {
        const payload = {
            uuid: user.uuid,
            firstName: user.first_name,
            userName: user.username,
        }

        return this.jwtService.sign(payload)

    }

    private async createUser(data) {
        const userData = {...data.userData, id: data.userData.id}
        const user = await this.userService.createUser(userData);
        const token = await this.generateToken(user);
        return {
            token,
            user
        }

    }

    private async createUserViaRefOnly(data) {
        const parent = await this.userService.getUserByUuid(data.ref);
        if (!parent || !data.ref) {
            throw new HttpException('User not Found', 422);
        }

        await this.sendMessageToParent(parent, data.userData.username);

        const userData = {
            ...data.userData,
            id: data.userData.id,
            parent_id: parent.uuid,
        };

        const user = await this.userService.createUser(userData);
        const token = await this.generateToken(user);
        return {
            token,
            user,
        };
    }

    private async sendMessageToParent(parent, username) {
        const {id} = parent;
        const message = `Finally! ${username} has joined your team on VultiRef!`
        await this.telegramBotService.sendMessage(id, message);

    }


    private async getInitialData(data: { tg_init_data: string, ref: string }) {
        const {tg_init_data, ref} = data;
        const decodedString = decodeURIComponent(tg_init_data);
        const params = new URLSearchParams(decodedString);
        const userData = JSON.parse(params.get('user'));
        const chatInstance = JSON.parse(params.get('chat_instance'));
        return {
            userData,
            chatInstance,
            ref,
        }
    }

}
