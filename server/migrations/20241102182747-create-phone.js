"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Phones", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      year_of_prod: {
        type: Sequelize.DATEONLY,
      },
      ram: {
        type: Sequelize.INTEGER,
      },
      cpu: {
        type: Sequelize.STRING(50),
      },
      screen_diagonal: {
        type: Sequelize.FLOAT,
      },
      have_nfc: {
        type: Sequelize.ENUM("Yes", "No", "Other"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Phones", {
      fields: ["ram"],
      type: "check",
      where: {
        ram: { [Op.between]: [0, 512] },
      },
    });
    await queryInterface.addConstraint("Phones", {
      fields: ["screen_diagonal"],
      type: "check",
      where: {
        screen_diagonal: { [Op.between]: [0.0, 100.0] },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Phones");
  },
};
