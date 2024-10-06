import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";

@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User)
        private userModel: typeof User
    ) {
    }

    async use(req: any, res: any, next: () => void
    ) {
        const token = req.headers['accesstoken']?.split(' ')[1];


        if (token) {
            const {uuid} = this.jwtService.decode(token);

            if (!uuid || typeof uuid === 'undefined') {
                throw new UnauthorizedException('Invalid token');
            }

            const user = await this.userModel.findOne({where: {uuid: uuid}});

            req.user = user; // Добавляем пользователя к запросу
        }
        next();
    }
}


