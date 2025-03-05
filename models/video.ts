'use strict';
import { Model } from 'sequelize';

interface VideoAttributes {
  videoLink: string;
  active: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Video extends Model<VideoAttributes> implements VideoAttributes {
    videoLink!: string;
    active!: boolean;
  }

  Video.init(
    {
      videoLink: { type: DataTypes.STRING },
      active: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'Video',
    }
  );

  return Video;
};
