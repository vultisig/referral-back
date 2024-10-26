
import {ApiProperty} from "@nestjs/swagger";
import {CreateAchievementDto} from "./create-achievement.dto";

export class CreateAchievementManyDto {
    @ApiProperty({
        type: [CreateAchievementDto],
        description: 'Array of achievements',
    })
    items: CreateAchievementDto[]

    @ApiProperty({
        example: 'uweZLdPEiPc9YNRQJfs2LEH8KonEOk9hWDc8SxNKEBIM3dY2Nn3YE1PTPRC1owdf6TZMd2O37H3NrTocnVZJxMrLdJMWXmwEYadZY8thuwLfxYxd5pWxIrIWrSCrP1tc',
        description: 'vultisig api key',
        type: 'string',
    })
    apiKey: string

}