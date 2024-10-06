import {ApiProperty} from '@nestjs/swagger';

export class SettingsDto {

    @ApiProperty({
        description: 'Maximum number of users per page',
        example: 100
    })
    readonly REFERRALS_MAX_TAKE: number

    @ApiProperty({
        description: 'Default number of users per page, 30',
        example: 30
    })
    readonly REFERRALS_DEFAULT_TAKE: number
    @ApiProperty({
        description: 'Minimum amount of dollars in the wallet, 50',
        example: 50
    })
    readonly MIN_AUM: number
}