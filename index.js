import express from "express";
import router from "./routes/students.js";
import bodyParser from "body-parser";
import { sequelize } from "./db/index.js";

const app = express();
const port = process.env.PORT || 3000;
