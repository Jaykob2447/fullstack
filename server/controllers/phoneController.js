const _ = require("lodash");
const createHttpError = require("http-errors");
const { Phone } = require("../models");
const { where } = require("sequelize");

module.exports.getPhone = async (req, res, next) => {
  try {
    const getPhones = await Phone.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
    });

    res.status(200).send({ data: getPhones });
  } catch (error) {
    next(error);
  }
};

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;
  try {
    const createPhones = await Phone.create(body);

    const preparedPhone = _.omit(createPhones.get(), [
      "id",
      "createdAt",
      "updatedAt",
    ]);
    res.status(201).send({ data: preparedPhone });
  } catch (error) {
    next(error);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const {
    params: { idPhone },
  } = req;
  try {
    const getPhones = await Phone.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      where: { id: idPhone },
    });

    res.status(200).send({ data: getPhones });
  } catch (error) {
    next(error);
  }
};

module.exports.updadePhoneById = async (req, res, next) => {
  const {
    body,
    params: { idPhone },
  } = req;
  try {
    const [, [updatePhones]] = await Phone.update(body, {
      raw: true,
      returning: true,
      where: { id: idPhone },
    });
    if (!updatePhones) {
      return next(createHttpError(404, "User Not Found"));
    }
    const preparedPhone = _.omit(updatePhones, ["id", "createdAt"]);
    res.status(200).send({ data: preparedPhone });
  } catch (error) {
    next(error);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const {
    params: { idPhone },
  } = req;
  try {
    const deletedPhone = await Phone.destroy({ where: { id: idPhone } });
    if (!deletedPhone) {
      return next(createHttpError(404, "User Not Found"));
    }
    res.status(200).send({ data: "Complite" });
  } catch (error) {
    next(error);
  }
};
