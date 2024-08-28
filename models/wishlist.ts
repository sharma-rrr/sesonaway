import { 
  Model
}  from 'sequelize';
interface UserAttributes{
    nameOfwish:string;
    comment:string;
    qty:number;
    productid:string;   
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Wish extends Model<UserAttributes>
  implements UserAttributes {
    nameOfwish!:string;
    comment!:string;
    qty!:number;
    productid!:string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Wish.init({
    nameOfwish:{type:DataTypes.STRING },
    comment:{type:DataTypes.STRING },
    qty:{type:DataTypes.INTEGER },
    productid:{type:DataTypes.STRING},
   
    
  
  }, {
    sequelize,
    modelName: 'Wishlists',
  });
  return  Wish;
};
