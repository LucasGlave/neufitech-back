import { Model, DataTypes, Sequelize } from 'sequelize';

export interface NeufialertUserAttributes {
    fullname: string;
    email: string;
    phone_number: string;
    number_id: string;
    verified: boolean;
}

export class NeufialertUser extends Model<NeufialertUserAttributes> implements NeufialertUserAttributes {
    public verified!: boolean;
    public fullname!: string;
    public email!: string;
    public phone_number!: string;
    public number_id!: string;

    public static initialize(sequelize: Sequelize): void {
        NeufialertUser.init(
            {
                fullname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                phone_number: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                number_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                verified: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: 'NeufialertUsers',
            }
        );
    }
}
