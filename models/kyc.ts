'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
Name:string;
dob:Date;
documetnType:string;
documentNo:string;
phoneNumber:string;
address:string;
User_id:string;
photo:string
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  kyc extends Model<UserAttributes>
  implements UserAttributes {
Name!:string;
dob!:Date;
documetnType!:string;
documentNo!:string;
phoneNumber!:string;
address!:string;
User_id!:string;
photo!:string
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  kyc.init({
    Name:{type:DataTypes.STRING,},
    dob:{type:DataTypes.DATE},
    documetnType:{type:DataTypes.STRING},
    documentNo: {type:DataTypes.STRING},
    phoneNumber: {type:DataTypes.STRING},             
    address:{type:DataTypes.STRING},
    User_id:{type:DataTypes.INTEGER},
    photo:{type:DataTypes.STRING}
  
  }, {
    sequelize,
    modelName: 'KYCS',
  });
  return  kyc;
};
