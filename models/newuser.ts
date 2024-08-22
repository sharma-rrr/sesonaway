'use strict';
import { 
  Model
}  from 'sequelize';
interface UserAttributes{
    user_id:string;
    name:string;



}
module.exports = (sequelize:any, DataTypes:any) => {
  class  user extends Model<UserAttributes>
  implements UserAttributes {
    user_id!:string;
    name!:string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  user.init({
    user_id:{type:DataTypes.STRING },
    name:{type:DataTypes.STRING },
    

    
  
  }, {
    sequelize,
    modelName: 'newUsers',
  });
  return  user;
};
