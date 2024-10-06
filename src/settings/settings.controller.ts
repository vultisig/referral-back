import {Controller, Get, HttpCode} from '@nestjs/common';
import {SettingsService} from "./settings.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SettingsDto} from "./dto/settings.dto";

@Controller('settings')
@ApiTags('settings')
export class SettingsController {
    constructor(private settingsService: SettingsService) {

    }

    @ApiOperation({summary: 'Get settings'})
    @ApiResponse({
        status: 200,
        description: 'Returns the application settings',
        type: SettingsDto,
    })
    @Get()
    @HttpCode(200)
    getSettingsList() {
        return this.settingsService.getSettingsList();
    }

}

