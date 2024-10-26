import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {AchievementsModel} from "../achievements/achievements.model";
@Table({tableName: 'user_achievements'})
export  class UserAchievementModel extends Model<UserAchievementModel, any> {
    @Column({type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({type: DataType.UUID})
    @ForeignKey(() => User )
    user_id: string;

    @BelongsTo(() => User, {foreignKey: 'uuid'})
    user: User;

    @Column({type: DataType.UUID})
    achievement_id: string;

    @BelongsTo(() => AchievementsModel, {foreignKey: 'achievement_id'})
    achievement:AchievementsModel


}