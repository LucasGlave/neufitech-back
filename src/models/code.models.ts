import { Model, DataTypes, Sequelize } from 'sequelize';

export interface CodeAttributes {
    code: string;
    verified: boolean;
}

export class Code extends Model<CodeAttributes> implements CodeAttributes {
    public verified!: boolean;
    public code!: string;

    public static initialize(sequelize: Sequelize): void {
        Code.init(
            {
                code: {
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
                tableName: 'codes',
            }
        );
    }
}
