import {Injectable} from '@nestjs/common';
import * as  process from "process";

@Injectable()
export class SettingsService {

    public getSettingsList() {
        return {
            REFERRALS_MAX_TAKE: process.env.REFERRALS_MAX_TAKE,
            REFERRALS_DEFAULT_TAKE: process.env.REFERRALS_DEFAULT_TAKE,
            MIN_AUM: process.env.MIN_AUM
        }
    }
}
