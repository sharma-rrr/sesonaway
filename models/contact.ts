'use strict';
import { 
  Model
}  from 'sequelize';
interface UserAttributes{
    fname:string;
    lname:string;
    phoneNumber:number;
    address:string;
    city:string
    Zipcode:number;
    country:string;
    state:string;
    userId:string;
    



}
module.exports = (sequelize:any, DataTypes:any) => {
  class  contact extends Model<UserAttributes>
  implements UserAttributes {
    fname!:string;
    lname!:string;
    phoneNumber!:number;
    address!:string;
    city!:string
    Zipcode!:number;
    country!:string;
    state!:string;
    userId!:string;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  contact.init({
    fname:{type:DataTypes.STRING },
    lname:{type:DataTypes.STRING },
    phoneNumber:{type:DataTypes.INTEGER },
    address:{type:DataTypes.STRING},
    city:{type:DataTypes.STRING},
    Zipcode:{type:DataTypes.INTEGER},
    country:{type:DataTypes.STRING},
    state:{type:DataTypes.STRING},
    userId:{type:DataTypes.STRING}

    
  
    
  }, {
    sequelize,
    modelName: 'Contacts',
  });
  return  contact;
};
