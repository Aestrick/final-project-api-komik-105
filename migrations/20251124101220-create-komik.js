'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('komik', { // <-- Ganti jadi 'komik' (kecil)
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: { type: Sequelize.STRING },
      penulis: { type: Sequelize.STRING },
      deskripsi: { type: Sequelize.TEXT },
      userId: {  // <--- INI KUNCI RELASINYA
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nyambung ke tabel 'users'
          key: 'id'       // Nyambung ke kolom 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Kalo user dihapus, komiknya ikut kehapus
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('komik');
  }
};