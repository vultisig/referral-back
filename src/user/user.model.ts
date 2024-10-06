import {Column, DataType, Model, BelongsTo, Table, ForeignKey} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({tableName: 'users'})
export class User extends Model<User, any> {
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    id: string

    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    })
    uuid: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: ''})
    first_name: string

    @Column({type: DataType.STRING, allowNull: false, defaultValue: ''})
    username: string;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    referrals_count: number

    @Column({type: DataType.STRING, allowNull: false, defaultValue: ''})
    wallet_id: string

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    wallet_public_key_eddsa: string

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    wallet_public_key_ecdsa: string

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    wallet_hex_chain_code: string

    @ForeignKey(() => User)
    @Column({type: DataType.UUID, allowNull: true})
    parent_id: string;

    @BelongsTo(() => User, {foreignKey: 'parent_id'})
    parent: User;

}