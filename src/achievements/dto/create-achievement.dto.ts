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

export  class CreateAchievementDtoSwagger extends CreateAchievementDto {

    @ApiProperty({
        example: 'uweZLdPEiPc9YNRQJfs2LEH8KonEOk9hWDc8SxNKEBIM3dY2Nn3YE1PTPRC1owdf6TZMd2O37H3NrTocnVZJxMrLdJMWXmwEYadZY8thuwLfxYxd5pWxIrIWrSCrP1tc',
        description: 'vultisig api key',
        type: 'string',
    })
    apiKey: string
}