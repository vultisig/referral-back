import {ApiProperty} from '@nestjs/swagger';

export class AuthUserDto {
    @ApiProperty({
        example: '####',
        description: 'telegram init data',
    })
    readonly tg_init_data: string;
    @ApiProperty({
        example: 'c8628ad0-9b31-4fe3-994c-a51e2ae30a94',
        description: 'uuid referral  vultisig user',
    })
    readonly ref: string;
}
