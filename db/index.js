import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("todo_list", "root", "y0RK*c17Y", {
  host: "localhost",
  dialect: "mysql",
});
