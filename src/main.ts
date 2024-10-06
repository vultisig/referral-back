import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {User} from "./user/user.model";
import * as process from "process";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    User.sync({alter: true});

    const swaggerConfig = new DocumentBuilder().setTitle('Vultisig api').setVersion('1.0').build()
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, document);
    await app.listen(process.env.APP_PORT);
}

bootstrap();
