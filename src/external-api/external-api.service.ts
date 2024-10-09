import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Op} from "sequelize";
import {HttpService} from "@nestjs/axios";
import * as process from "process";
import {lastValueFrom} from "rxjs";
import {AxiosResponse} from "axios/index";
import {VASUser} from "../auth/interfaces/vasUser";


@Injectable()
export class ExternalApiService {
    constructor(@InjectModel(User) private userModel: typeof User, private readonly httpService: HttpService) {
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

    async putUserToVAS(user: User) {
        const currentUser = await this.userModel.findOne({where: {uuid: user.uuid}})
        if (!currentUser.wallet_public_key_eddsa || !currentUser.wallet_public_key_ecdsa) {
            return new HttpException('User has no wallet', 500)
        }
        try {
            const res = await lastValueFrom(this.httpService.post(`${process.env.VAS_URL}`, {
                hex_chain_code: currentUser.wallet_hex_chain_code,
                public_key_ecdsa: currentUser.wallet_public_key_ecdsa,
                public_key_eddsa: currentUser.wallet_public_key_eddsa,
                uid: currentUser.wallet_uid,
                name: `${currentUser.username}'s wallet`
            }))


            return res.data
        } catch (e) {
            if (e.response && e.response.status === 400) {
                throw new HttpException('User is already registered', 400);
            }
            throw new HttpException('', 500)
        }


    }

    async getUSerFromVAS(user: User): Promise<VASUser | any> {
        const currentUser = await this.userModel.findOne({where: {uuid: user.uuid}})
        if (!currentUser.wallet_public_key_eddsa || !currentUser.wallet_public_key_ecdsa) {
            return new HttpException('User has no wallet', 500)
        }
        try {
            const res: AxiosResponse<VASUser> = await lastValueFrom(this.httpService.get(`${process.env.VAS_URL}${currentUser.wallet_public_key_ecdsa}/${currentUser.wallet_public_key_eddsa}`))
            return res.data
        } catch (e) {
            throw new HttpException('', 500)
        }


    }

    async checkUserAirdropStatus(uuid: string): Promise<{ status: boolean } | HttpException> {
        const user = await this.userModel.findOne({where: {uuid: uuid}})
        if (!user.wallet_public_key_eddsa || !user.wallet_public_key_ecdsa) {
            return new HttpException('User has no wallet', 500)

        }
        try {
            const res: AxiosResponse<VASUser> = await lastValueFrom(this.httpService.get(`${process.env.VAS_URL}${user.wallet_public_key_ecdsa}/${user.wallet_public_key_eddsa}`))
            return {
                status: res.data.join_airdrop
            }
        } catch (e) {
            throw new HttpException('', 500)
        }


    }

    async joinToAirdrop(uuid: string): Promise<{ join_airdrop: boolean } | HttpException> {
        const user = await this.userModel.findOne({where: {uuid: uuid}})
        if (!user.wallet_public_key_eddsa || !user.wallet_public_key_ecdsa) {
            return new HttpException('User has no wallet', 500)
        }
        try {
            const vasUser = await this.getUSerFromVAS(user)
            const sendData = {
                hex_chain_code: user.wallet_hex_chain_code,
                name: vasUser.name,
                public_key_ecdsa: vasUser?.public_key_ecdsa,
                public_key_eddsa: vasUser?.public_key_eddsa,
                uid: vasUser?.uid,
            }


            const res = await lastValueFrom(this.httpService.post(`https://airdrop.vultisig.com/api/vault/join-airdrop`, sendData))
            return {
                join_airdrop: true
            }
        } catch (e) {
            throw new HttpException('', e.status)
        }
    }
}



