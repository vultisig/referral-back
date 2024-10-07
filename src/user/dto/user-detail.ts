import {ApiProperty} from "@nestjs/swagger";

export class UserDetailDto {

    @ApiProperty({
        example: '00x001233123',
        description: 'Vultisig UUID',
        type: 'string',
    })
    readonly uuid: string

    @ApiProperty({
        example: 0,
        description: 'referrals_count',
        type: 'number',
    })

    readonly referrals_count: number

    @ApiProperty({
        example: '00x001233123',
        description: 'wallet_uuid',
        type: 'string',
    })
    readonly wallet_uid: string

    @ApiProperty({
        example: '00x001233123',
        description: 'wallet_public_key_eddsa',
        type: 'string',
    })
    readonly wallet_public_key_eddsa: string

    @ApiProperty({
        example: '00x001233123',
        description: 'wallet_public_key_ecdsa',
        type: 'string',
    })
    readonly wallet_public_key_ecdsa: string

    @ApiProperty({
        example: '00x001233123',
        description: 'wallet_hex_chain_code ',
        type: 'string',
    })
    readonly wallet_hex_chain_code: string

    @ApiProperty({
        example: '00x001233123',
        description: 'parent_id',
        type: 'string',
    })
    readonly parent_id: string

    @ApiProperty({
        example: '11.23.23',
        description: 'date of creation',
        type: 'string',
    })

    readonly createdAt: Date


}