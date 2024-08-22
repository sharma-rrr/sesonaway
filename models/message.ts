'use strict';
import { 
  Model
}  from 'sequelize';
interface UserAttributes{
    sender_id:string;
    reciver_id:string;
    message:string



}
module.exports = (sequelize:any, DataTypes:any) => {
  class  send extends Model<UserAttributes>
  implements UserAttributes {
    sender_id!:string;
    reciver_id!:string;
    message!:string

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  send.init({
    sender_id:{type:DataTypes.STRING },
    reciver_id:{type:DataTypes.STRING },
    message:{type:DataTypes.STRING}
    

    
  
  }, {
    sequelize,
    modelName: 'chatboxs',
  });
  return  send;
};
