import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Attributes, NonNullFindOptions} from "sequelize";
import {ChangeWalletDto} from "./dto/change-wallet.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {

    }


    async getUserByUuid(userId: string) {
        if (!userId) {
            throw new Error('User ID must be provided');
        }

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


    async changeUserWallet(user: User, data: ChangeWalletDto): Promise<User> {
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

