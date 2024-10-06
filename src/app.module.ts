import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import {SettingsModule} from './settings/settings.module';
import {UserModule} from './user/user.module';
import * as process from 'process';
import {User} from "./user/user.model";
import { ExternalApiModule } from './external-api/external-api.module';
import { AuthModule } from './auth/auth.module';


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
            models: [User],
            autoLoadModels: true,
            synchronize: true,
        }),
        SettingsModule,
        UserModule,
        ExternalApiModule,
        AuthModule

    ],
    exports: [],
})
export class AppModule {
}
