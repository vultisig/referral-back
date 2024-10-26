import {Column, DataType, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

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

    @Column({type: DataType.STRING, allowNull: true,})
    icon: string

    @Column({type: DataType.DATE, allowNull: true,})
    start_date: Date

    @Column({type: DataType.DATE, allowNull: true,})
    end_date: Date
}