import {ApiProperty} from "@nestjs/swagger";

export class ExternalUsersDto {

    @ApiProperty({
        example: '0',
        description: 'skip users',
        type: 'number',
    })
    readonly skip: string

    @ApiProperty({
        example: '10',
        description: 'take users',
        type: 'number',
    })
    readonly take: string

    @ApiProperty({
        example: 'uweZLdPEiPc9YNRQJfs2LEH8KonEOk9hWDc8SxNKEBIM3dY2Nn3YE1PTPRC1owdf6TZMd2O37H3NrTocnVZJxMrLdJMWXmwEYadZY8thuwLfxYxd5pWxIrIWrSCrP1tc',
        description: 'vultisig api key',
        type: 'string',
    })
    readonly apiKey: string


}