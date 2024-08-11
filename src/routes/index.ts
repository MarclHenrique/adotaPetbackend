import express from "express";
import petRouter from "../routes/petRouter"
import adotanteRouter from "./adotanteRoutes";


const router = (app: express.Router) => {
    app.use("/pets", petRouter);
    app.use("/adotantes", adotanteRouter); //linha adicionada

};

export default router;