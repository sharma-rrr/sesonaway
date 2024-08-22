'use strict';
import { Model, DataTypes } from 'sequelize';

interface SlotAttributes {
  slotName: string;
  startTime: Date;
  endTime: Date;
  active: boolean;
  entryFees: number;
  winAmount: number;
}

module.exports = (sequelize: any) => {
  class Slot extends Model<SlotAttributes> implements SlotAttributes {
    slotName!: string;
    startTime!: Date;
    endTime!: Date;
    active!: boolean;
    entryFees!: number;
    winAmount!: number;

    static associate(models: any) {
      // Define associations here if any
    }
  }

  Slot.init(
    {
      slotName: { type: DataTypes.STRING, allowNull: false },
      startTime: { type: DataTypes.DATE},
      endTime: { type: DataTypes.DATE },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
      entryFees: { type: DataTypes.FLOAT, allowNull: false },
      winAmount: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Slots',
    }
  );

  return Slot;
};
