'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
coins:number;
userId:number;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  coin extends Model<UserAttributes>
  implements UserAttributes {
    coins!:number;
    userId!:number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  coin.init({
    coins:{type:DataTypes.INTEGER},
    userId:{type:DataTypes.INTEGER},
  
  }, {
    sequelize,
    modelName: 'Coins',
  });
  return  coin;
};
