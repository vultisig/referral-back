import { Module } from '@nestjs/common';
import {ExternalApiController} from "./external-api.controller";
import {ExternalApiService} from "./external-api.service";
import {User} from "../user/user.model";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    controllers:[ExternalApiController],
    providers: [ExternalApiService],
    imports:[
        SequelizeModule.forFeature([User])
    ]
})
export class ExternalApiModule {

}
