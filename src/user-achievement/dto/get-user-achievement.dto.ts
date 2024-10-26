import {ApiProperty} from "@nestjs/swagger";

export class GetUserAchievementDto {

    @ApiProperty({
        example: 1,
        description: 'skip',
        type: 'number',
    })
    skip: number

    @ApiProperty({
        example: 10,
        description: 'take',
        type: 'number',
    })
    take: number
}