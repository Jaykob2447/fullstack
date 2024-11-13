"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  //npx sequelize model:create --name "Phone" --attributes model:string,brand:string,year_of_prod:dateonly,ram:integer,cpu:string,screen_diagonal:string,have_nfc:boolean
  Phone.init(
    {
      model: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: { len: [2, 40] },
      },
      brand: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: { len: [2, 40] },
      },
      year_of_prod: { type: DataTypes.DATEONLY, validate: { isDate: true } },
      ram: { type: DataTypes.INTEGER, validate: { isInt: true } },
      cpu: { type: DataTypes.STRING(40), validate: { len: [2, 40] } },
      screen_diagonal: { type: DataTypes.FLOAT },
      have_nfc: { type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      modelName: "Phone",
    }
  );
  return Phone;
};
