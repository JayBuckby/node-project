import express from "express";
import router from "./routes/tasks.js";
import bodyParser from "body-parser";
import { sequelize } from "./db/index.js";

const app = express();
const port = process.env.PORT || 3000;

try {
  const result = await sequelize.sync();
  console.log(result);
} catch (error) {
  console.log(error);
}

// const connect = () => {
//   sequelize
//     .sync()
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// setTimeout(connect, 30000);

app.use(bodyParser.json());
app.use("/tasks", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
