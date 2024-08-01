'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
language:string;
userid:number

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  lpun extends Model<UserAttributes>
  implements UserAttributes {
   language!: string;
   userid!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  lpun.init({
    userid:{type:DataTypes.INTEGER,},
    language:{type:DataTypes.STRING},
   
  
  }, {
    sequelize,
    modelName: 'Language',
  });
  return  lpun;
};
