import {CreateAchievementsCodeDto} from "./create-achievements-code.dto";
import {ApiProperty} from "@nestjs/swagger";


export class CreateAchievementsCodeManyDto{
    @ApiProperty({
        type: [CreateAchievementsCodeDto],
        description: 'Array of achievements',
    })
    items: CreateAchievementsCodeDto[]

    @ApiProperty({
        example: 'uweZLdPEiPc9YNRQJfs2LEH8KonEOk9hWDc8SxNKEBIM3dY2Nn3YE1PTPRC1owdf6TZMd2O37H3NrTocnVZJxMrLdJMWXmwEYadZY8thuwLfxYxd5pWxIrIWrSCrP1tc',
        description: 'vultisig api key',
        type: 'string',
    })
    apiKey: string
}