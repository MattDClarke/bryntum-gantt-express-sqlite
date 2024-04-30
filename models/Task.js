import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tasks",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    effort: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    effortUnit: {
      type: DataTypes.STRING,
      defaultValue: "hour",
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    durationUnit: {
      type: DataTypes.STRING,
      defaultValue: "day",
    },
    percentDone: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    schedulingMode: {
      type: DataTypes.STRING,
      defaultValue: "Normal",
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    constraintType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    constraintDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    manuallyScheduled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    unscheduled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ignoreResourceCalendar: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    effortDriven: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    inactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cls: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    iconCls: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentIndex: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    expanded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    calendar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tasks",
    timestamps: false,
    indexes: [
      {
        fields: ["parentId"],
      },
      {
        fields: ["calendar"],
      },
    ],
  }
);

export default Task;