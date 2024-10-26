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


export  class CreateAchievementsCodeDtoSwagger extends CreateAchievementsCodeDto {

    @ApiProperty({
        example: 'uweZLdPEiPc9YNRQJfs2LEH8KonEOk9hWDc8SxNKEBIM3dY2Nn3YE1PTPRC1owdf6TZMd2O37H3NrTocnVZJxMrLdJMWXmwEYadZY8thuwLfxYxd5pWxIrIWrSCrP1tc',
        description: 'vultisig api key',
        type: 'string',
    })
    apiKey: string
}