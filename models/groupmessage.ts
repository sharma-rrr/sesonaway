'use strict';
import { group } from 'console';
import { grep } from 'jquery';
import { 
  Model
}  from 'sequelize';
interface UserAttributes{
   sender_id:string;
    message:string;



}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Group extends Model<UserAttributes>
  implements UserAttributes {
    sender_id!:string;
    message!:string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Group.init({
    sender_id:{type:DataTypes.STRING },
    message:{type:DataTypes.STRING },
    
  }, {
    sequelize,
    modelName: 'groupChats',
  });
  return  Group;
};
