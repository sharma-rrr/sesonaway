'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
lastseen:number;
status:number;
about:number;
profilephoto:number;
userId:number
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  privacy extends Model<UserAttributes>
  implements UserAttributes {
    lastseen!:number;
    status!:number;
    about!:number;
    profilephoto!:number;
    userId!:number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  privacy.init({
    lastseen:{type:DataTypes.INTEGER },
    status:{type:DataTypes.INTEGER },
    about:{type:DataTypes.INTEGER },
    profilephoto:{type:DataTypes.INTEGER},
    userId:{type:DataTypes.INTEGER}
    
  
  }, {
    sequelize,
    modelName: 'Privacy',
  });
  return  privacy;
};
