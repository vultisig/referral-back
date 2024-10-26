import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import {SettingsModule} from './settings/settings.module';
import {UserModule} from './user/user.module';
import * as process from 'process';
import {User} from "./user/user.model";
import {AchievementsModel}  from "./achievements/achievements.model";
import { ExternalApiModule } from './external-api/external-api.module';
import { AuthModule } from './auth/auth.module';
import { AchievementsModule } from './achievements/achievements.module';
import { AchievementsCodeModule } from './achievements-code/achievements-code.module';
import { UserAchievementModule } from './user-achievement/user-achievement.module';
import {UserAchievementModel} from "./user-achievement/user-achievement.model";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User,UserAchievementModel,AchievementsModel],
            autoLoadModels: true,
            synchronize: true,
        }),
        SettingsModule,
        UserModule,
        ExternalApiModule,
        AuthModule,
        AchievementsModule,
        AchievementsCodeModule,
        UserAchievementModule

    ],
    exports: [],
})
export class AppModule {
}
