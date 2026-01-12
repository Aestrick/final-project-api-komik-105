'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // RELASI: User bisa punya BANYAK Komik (One-to-Many)
      User.hasMany(models.Komik, {
        foreignKey: 'userId', // Kuncinya ada di kolom 'userId' di tabel komik
        as: 'list_komik'      // Nanti pas dipanggil di Postman namanya 'list_komik'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // --- (WAJIB) TAMBAHAN KOLOM EMAIL ---
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // --- (WAJIB) TAMBAHAN KOLOM ROLE ---
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user' // Default jadi user biasa
    },
    // --- (WAJIB) FITUR UTAMA KITA: API KEY ---
    api_key: {
      type: DataTypes.STRING,
      allowNull: true,     // Boleh null (kalau ada user lama belum digenerate)
      unique: true         // Kunci harus unik, gak boleh kembar
    }
    // ------------------------------------------
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users' // Pastikan nama tabelnya 'users'
  });
  return User;
};