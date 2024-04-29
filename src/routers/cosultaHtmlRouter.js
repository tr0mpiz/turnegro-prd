import express from "express";
import { con, upload } from "../utils.js";
import fs from "fs";
import { __dirname, __filename,ejecutarConsulta } from "../utils.js";

//import { agendaService } from "../services/agenda.services.js";
//import { agendaModel } from "../DAO/models/agenda.model.js";

export const cosultaHtmlRouter = express.Router();

//const Service = new agendaService();

cosultaHtmlRouter.get("/", async (req, res) => {
    try {
        return res.status(200).render("pantalla");
    }  catch (error) {
        console.error(error);
        return res.status(404).json({msg:"fallo"});
      }

   
});

