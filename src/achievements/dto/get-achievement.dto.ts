import {ApiProperty} from "@nestjs/swagger";

export class GetAchievementDto{

    @ApiProperty({
        example: '2020-07-10 15:00:00.000',
        description: 'start date',
        type: 'DATE',
    })
    start_date__gte:Date

    @ApiProperty({
        example: '2020-07-10 15:00:00.000',
        description: 'end date',
        type: 'DATE',
    })
    end_date__lte:Date
}