import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {UserAchievementModel} from "../user-achievement/user-achievement.model";

@Table({tableName: 'achievements'})
export class AchievementsModel extends Model<AchievementsModel> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    })
    id: string

    @Column({type: DataType.STRING, allowNull: false,})
    code: string

    @Column({type: DataType.STRING, allowNull: false,})
    name: string

    @Column({type: DataType.STRING, allowNull: true,})
    icon: string

    @Column({type: DataType.DATE, allowNull: true,})
    start_date: Date

    @Column({type: DataType.DATE, allowNull: true,})
    end_date: Date

    @Column({type: DataType.STRING, allowNull: true,})
    description: string

    @Column({type: DataType.STRING, allowNull: true,})
    color: string

    @HasMany(() => UserAchievementModel)
    userAchievements: UserAchievementModel[];
}