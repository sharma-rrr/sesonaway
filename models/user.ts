'use strict';
import { Model } from 'sequelize';
interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  active: boolean;
  captcha: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;
    active!: boolean;
    captcha!: string;

  }
 
  User.init(
    {
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      confirmPassword: { type: DataTypes.STRING },
      active: { type: DataTypes.BOOLEAN, defaultValue: false},
      captcha: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
