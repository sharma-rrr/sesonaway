'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';
interface UserAttributes {
  email: string;
  slotStartingTime: string;
  slotEndingTime: string;
  slotFeeEntry: number;
  boughtNo: number;
  userId: string;
}

module.exports = (sequelize: Sequelize) => {
  class Buy extends Model<UserAttributes> implements UserAttributes {
    public email!: string;
    public slotStartingTime!: string;
    public slotEndingTime!: string;
    public slotFeeEntry!: number;
    public boughtNo!: number;
    public userId!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }

  Buy.init(
    {
      email: { type: DataTypes.STRING, allowNull: false },
      slotStartingTime: { type: DataTypes.STRING, allowNull: false },
      slotEndingTime: { type: DataTypes.STRING, allowNull: false},
      slotFeeEntry: { type: DataTypes.INTEGER, allowNull: false },
      boughtNo: { type: DataTypes.INTEGER, allowNull: false},
      userId: { type: DataTypes.STRING, allowNull: false},
    },
    {
      sequelize,
      modelName: 'boughtnumbers',
  
    }
  );

  return Buy;
};
