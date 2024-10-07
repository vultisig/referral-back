import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Op} from "sequelize";



@Injectable()
export class ExternalApiService {
    constructor(@InjectModel(User) private userModel: typeof User) {
    }

    async getUsers(skip: number = 0, take: number = 10): Promise<{ count: number; rows: User[] }> {
        const {count, rows: users} = await this.userModel.findAndCountAll({
            where: {
                [Op.and]: [
                    {
                        wallet_public_key_ecdsa: {
                            [Op.and]: [
                                {[Op.ne]: null},
                                {[Op.ne]: ''}
                            ]
                        }
                    },
                    {
                        wallet_public_key_eddsa: {
                            [Op.and]: [
                                {[Op.ne]: null},
                                {[Op.ne]: ''}
                            ]
                        }
                    }
                ]
            },
            offset: skip,
            limit: take,
            order: [['createdAt', 'DESC']],
            attributes: ['uuid', 'referrals_count', 'wallet_uid', 'wallet_public_key_eddsa', 'wallet_public_key_ecdsa', 'wallet_hex_chain_code', 'parent_id', 'createdAt']

        });


        return {
            count,
            rows: users
        }

    }
}
