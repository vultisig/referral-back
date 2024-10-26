import {ApiProperty} from "@nestjs/swagger";

export class CreateAchievementDto {

    @ApiProperty({
        example: 'awesome achievement',
        description: 'name of achievement',
        type: 'string',
    })
    name: string

    @ApiProperty({
        example: 'gd-2024',
        description: 'icon of achievement',
        type: 'string',
    })
    icon: string

    @ApiProperty({
        example: 'wsdw2331',
        description: 'unique code of achievement',
        type: 'string',
    })
    code: string

    @ApiProperty({
        example: '2020-07-10 15:00:00.000',
        description: 'start date',
        type: 'string',
        format: 'date-time',
    })

    start_date: Date

    @ApiProperty({
        example: '2020-07-10 15:00:00.000',
        description: 'end date',
        type: 'string',
        format: 'date-time',
    })
    end_date: Date
}