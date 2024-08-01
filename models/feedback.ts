'use strict';
import { 
  Model
}  from 'sequelize';
interface UserAttributes{
    name:string;
    email:string;
    phoneNumber:string;
    query:string;
   
  


}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Feed extends Model<UserAttributes>
  implements UserAttributes {
    name!:string;
    email!:string;
    phoneNumber!:string;
    query!:string;
   


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Feed.init({
    name:{type:DataTypes.STRING },
    email:{type:DataTypes.STRING },
    phoneNumber:{type:DataTypes.STRING },
    query:{type:DataTypes.STRING},
   
  
  }, {
    sequelize,
    modelName: 'Feedbacks',
  });
  return  Feed;
};
