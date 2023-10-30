"use strict"
const { Model } = require("sequelize")
const { hashData } = require("../helpers")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user) {
          user.password = hashData(user.password)
        },
      },
    }
  )
  return User
}
