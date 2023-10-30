"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookmark.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId is required" },
          notEmpty: { msg: "UserId is required" },
        },
      },
      MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "MovieId is required" },
          notEmpty: { msg: "MovieId is required" },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "title is required" },
          notEmpty: { msg: "title is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  )
  return Bookmark
}
