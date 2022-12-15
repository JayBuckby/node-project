import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../db/index.js";

export const Tasks = sequelize.define(
  "task",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    task: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },

  {
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
