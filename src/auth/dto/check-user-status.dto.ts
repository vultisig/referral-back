import {ApiProperty} from "@nestjs/swagger";

export class CheckUserStatusDto {
    @ApiProperty({
        description: 'UUID of the user',
        type: 'string',
        required: true
    })
    uuid: string
}