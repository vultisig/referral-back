import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {User} from "../user/user.model";
import {AchievementsModel} from "../achievements/achievements.model";
import {UserAchievementModel} from "../user-achievement/user-achievement.model";

@Table({tableName: 'achievements_code'})
export class AchievementsCodeModel extends Model<AchievementsCodeModel> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    code: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: true })
    user_id: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => AchievementsModel)
    @Column({ type: DataType.UUID, allowNull: true })
    achievement_id: string;

    @BelongsTo(() => AchievementsModel)
    achievement: AchievementsModel;

    @Column({ type: DataType.STRING, allowNull: true })
    used_date: string;


}