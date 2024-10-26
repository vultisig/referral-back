import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {AchievementsModel} from "../achievements/achievements.model";
@Table({tableName: 'user_achievements'})
export  class UserAchievementModel extends Model<UserAchievementModel, any> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    user_id: string;

    @ForeignKey(() => AchievementsModel)
    @Column({ type: DataType.UUID, allowNull: false })
    achievement_id: string;

    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.STRING, allowNull: true })
    code:string

    @BelongsTo(() => AchievementsModel)
    achievement: AchievementsModel;


}