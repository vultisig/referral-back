import {ApiProperty} from "@nestjs/swagger";

export class ChangeWalletDto {
    @ApiProperty({
        example: '00x001233123',
        description: 'Wallet uid',
        type: 'string',
    })
    readonly wallet_uid: string

    @ApiProperty({
        example: '00x001233123',
        description: 'Wallet public_key_ecdsa',
        type: 'string',
    })
    readonly wallet_public_key_ecdsa: string

    @ApiProperty({
        example: '00x001233123',
        description: 'wallet_public_key_eddsa',
        type: 'string',
    })
    readonly wallet_public_key_eddsa: string

    @ApiProperty({
        example: '00x001233123',
        description: 'wallet_hex_chain_code',
        type: 'string',
    })
    readonly wallet_hex_chain_code: string
}