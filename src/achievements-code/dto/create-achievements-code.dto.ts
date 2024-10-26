import {ApiProperty} from "@nestjs/swagger";

export class CreateAchievementsCodeDto {


    @ApiProperty({
        example: 'asdasd123',
        description: 'unigue code of achievement',
        type: 'string',
    })
    code: string

    @ApiProperty({
        example: 'c225c09c-eee5-4eb7-aa1e-624559ff5809',
        description: 'uuid of achievement',
        type: 'string',
    })
    achievement_id: string


}