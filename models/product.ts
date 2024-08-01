'use strict';
import { Model } from 'sequelize';
interface ProductAttributes {
    ProductID: number;
    ProductName: string;
    SupplierID: number;
    CategoryID: number;
    Price: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    ProductID!: number;
    ProductName!: string;
    SupplierID!: number;
    CategoryID!: number;
    Price!: number;

    static associate(models: any) {
      // define association here
    }
  };

  Product.init({
    ProductID: { type: DataTypes.INTEGER },
    ProductName: { type: DataTypes.STRING },
    SupplierID: { type: DataTypes.INTEGER },
    CategoryID: { type: DataTypes.INTEGER },
    Price: { type: DataTypes.FLOAT },
  }, {
    sequelize,
    modelName: 'Products',
  });
  
  return Product;
};
