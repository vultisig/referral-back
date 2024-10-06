import {ApiProperty} from "@nestjs/swagger";

export class UserDetailDto {

    @ApiProperty({
        example: '00x001233123',
        description: 'Telegram user id',
        type: 'string',
    })
    readonly id: string

    @ApiProperty({
        example: '00x001233123',
        description: 'wallet_hex_chain_code ',
        type: 'string',
    })
    readonly wallet_hex_chain_code: string

    @ApiProperty({
        example: '00x001233123',
        description: 'wallet_uuid',
        type: 'string',
    })
    readonly wallet_uuid: string

    @ApiProperty({
        example: '00x001233123',
        description: 'parent_id',
        type: 'string',
    })
    readonly parent_id: string




}