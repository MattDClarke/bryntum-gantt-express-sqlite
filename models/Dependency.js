import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Dependency = sequelize.define(
  "Dependency",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fromEvent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tasks", 
        key: "id",
      },
      onDelete: "CASCADE",
    },
    toEvent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tasks",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    cls: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lag: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    lagUnit: {
      type: DataTypes.STRING,
      defaultValue: "day",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fromSide: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    toSide: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "dependencies",
    timestamps: false,
    indexes: [
      {
        fields: ["fromEvent"],
      },
      {
        fields: ["toEvent"],
      },
    ],
  }
);

export default Dependency;