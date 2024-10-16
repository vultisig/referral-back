import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Op} from "sequelize";
import {ChangeWalletDto} from "./dto/change-wallet.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {

    }


    async getUserByUuid(userId: string) {
        return await this.userModel.findOne({where: {uuid: userId}})
    }

    async getUserByTelegramId(telegramId: string): Promise<User> {
        if (!telegramId) {
            throw new Error('Telegram ID must be provided');
        }

        return await this.userModel.findOne({where: {id: telegramId.toString()}})
    }

    async getMe(user: User): Promise<User> {

        return await this.userModel.findOne({where: {uuid: user.uuid}})
    }


    async createUser(data: any): Promise<User> {
        return await this.userModel.create(data)
    }

    async updateUser(user: User, data: any): Promise<User> {
        const transaction = await this.userModel.sequelize.transaction();
        try {
            await user.update(data, {transaction});
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }

        return user

    }


    async getUsersReferrals(user: User, skip: number = 0, take: number = 10): Promise<{
        total: number,
        items: User[]
    }> {

        const result: { count: number; rows: User[] } = await this.userModel.findAndCountAll({
            where: {parent_id: user.uuid},
            offset: skip,
            limit: take,
        });

        return {
            total: result.count,
            items: result.rows
        }
    }

    private async checkUserWallet(id: string, data: ChangeWalletDto): Promise<boolean> {
        const user = await this.userModel.findOne({
            where: {
                [Op.and]: [
                    {
                        wallet_public_key_ecdsa: data.wallet_public_key_ecdsa
                    },
                    {
                        wallet_public_key_eddsa: data.wallet_public_key_eddsa
                    }

                ]
            }
        })

        return !user || user.id === id;

    }


    async changeUserWallet(user: User, data: ChangeWalletDto): Promise<User> {
        if (!await this.checkUserWallet(user.id, data)) {
            throw new HttpException('is not your wallet', 423)
        }

        const transaction = await this.userModel.sequelize.transaction();
        try {
            const currentUser = await this.userModel.findOne({where: {id: user.id}, transaction});
            await currentUser.update(data, {transaction});
            await transaction.commit();
            return currentUser;

        } catch (e) {
            await transaction.rollback();
            throw e;
        }


    }
}

