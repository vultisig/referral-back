import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {User} from "../user/user.model";
import {AchievementsModel} from "../achievements/achievements.model";

@Table({tableName: 'achievements_code'})
export class AchievementsCodeModel extends Model<AchievementsCodeModel> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    })
    id: string

    @Column({type: DataType.STRING, allowNull: false})
    code: string

    @ForeignKey(() => User)
    @Column({type: DataType.STRING, allowNull: true,})
    user_id: string

    @ForeignKey(() => AchievementsModel)
    achievement_id: string


    @Column({type: DataType.STRING, allowNull: true,})
    used_date: string

}