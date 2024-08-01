'use strict';
import { 
  Model
}  from 'sequelize';
interface UserAttributes{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string
    active:boolean;
    captcha:string;


}
module.exports = (sequelize:any, DataTypes:any) => {
  class  User extends Model<UserAttributes>
  implements UserAttributes {
    firstName!:string;
    lastName!:string;
    email!:string;
    password!:string;
    confirmPassword!:string
    active!:boolean
    captcha!:string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  User.init({
    firstName:{type:DataTypes.STRING },
    lastName:{type:DataTypes.STRING },
    email:{type:DataTypes.STRING },
    password:{type:DataTypes.STRING},
    confirmPassword:{type:DataTypes.STRING},
    active:{type:DataTypes.BOOLEAN,defaultValue:false},
    captcha:{type:DataTypes.STRING}

    
  
  }, {
    sequelize,
    modelName: 'Users',
  });
  return  User;
};
