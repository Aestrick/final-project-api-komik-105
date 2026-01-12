'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Komik extends Model {
    static associate(models) {
      Komik.belongsTo(models.User, {
        foreignKey: 'userId', 
        as: 'pemilik'         
      });
    }
  }
  Komik.init({
    judul: DataTypes.STRING,
    penulis: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Komik',
    tableName: 'komik' 
  });
  return Komik;
};