import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { appDataSource } from "./config/dataSource";

appDataSource.initialize().then(() => {
  console.log("Banco de dados UP");
}).catch(erro => {
  console.log(erro);
});

const app = express();
app.use(express.json());
router(app);

export default app;
