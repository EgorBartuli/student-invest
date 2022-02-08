'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connections extends Model {

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'student_id' })
      this.belongsTo( models.User, { foreignKey: 'investor_id' })
    }
  };
  Connections.init({
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    investor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Connections',
  });
  return Connections;
};
