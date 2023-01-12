import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("todo_list", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
