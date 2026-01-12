'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Kita tambahin kolom 'api_key' ke tabel 'Users'
    await queryInterface.addColumn('Users', 'api_key', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true, // Biar satu kunci cuma buat satu orang
      after: 'password' // Posisi kolomnya biar rapi di sebelah password
    });
  },

  async down (queryInterface, Sequelize) {
    // Kalo mau undo, kita apus kolomnya
    await queryInterface.removeColumn('Users', 'api_key');
  }
};