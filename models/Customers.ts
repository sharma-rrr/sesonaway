'use strict';
import { 
  Model
}  from 'sequelize';
interface UserAttributes{
    CustomerID:string;
    CustomerName:string;
    Address:string;
    City:string;
    Country:string
    PostalCode:number;
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Customer extends Model<UserAttributes>
  implements UserAttributes {
    CustomerID!:string;
    CustomerName!:string;
    Address!:string;
    City!:string;
    Country!:string
    PostalCode!:number;


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Customer.init({
    CustomerID:{type:DataTypes.STRING },
    CustomerName:{type:DataTypes.STRING },
    Address:{type:DataTypes.STRING },
    City:{type:DataTypes.STRING},
    Country:{type:DataTypes.STRING},
    PostalCode:{type:DataTypes.INTEGER},
  
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return  Customer;
};
