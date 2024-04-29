import express from "express";
import fs from "fs";
import path from "path";
import { isUser } from "../middleware/Helper.js";
import { __dirname, con, ejecutarConsulta } from "../utils.js";
import { socketServer } from "../app.js"; // Importa el objeto io desde app.js

export const turneroHtmlRouter = express.Router();
turneroHtmlRouter.get("/", isUser,async (req, res) => {
    try {
        
        const turnos = await ejecutarConsulta("SELECT a.*, b.nombre AS nombretramite, c.nombre AS nombreestado, LEFT(b.nombre, 1) AS primera_letra,RIGHT(b.nombre, 1) AS ultima_letra, DATE_FORMAT(a.fecha, '%d/%m/%Y') AS fechaf,b.requisitos FROM turnos a, tramites b, estados_turnos c  WHERE a.tramite_id = b.id AND a.estado_id = c.id;");
        //crea una constante que tenga todos los tramites y busca en turnos los tramites que esten activos y los agrupa y suma la cantidad de tramites que hay por tramite
        const tramitesTotalesAgrupadosYSumados = await ejecutarConsulta("SELECT b.nombre, COUNT(a.tramite_id) AS cantidad FROM turnos a, tramites b WHERE a.tramite_id = b.id AND a.estado_id = 1 GROUP BY a.tramite_id;");
        const hoy = new Date();
        const turnoshoy = await ejecutarConsulta(`SELECT COUNT(a.tramite_id) AS total FROM turnos a WHERE  a.fecha = '${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}';`);
        const turnosparticular = await ejecutarConsulta(`SELECT COUNT(a.tramite_id) AS total FROM turnos a WHERE  a.fecha = '${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}' AND a.tramite_id = 2;`);
        const turnosprepagas = await ejecutarConsulta(`SELECT COUNT(a.tramite_id) AS total FROM turnos a  WHERE a.fecha = '${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}' AND a.tramite_id = 1;`);
        const turnostotal = await ejecutarConsulta(`SELECT COUNT(a.tramite_id) AS total FROM turnos a  WHERE a.fecha = '${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}';`);
        return res.status(200).render("turnero", { turnos ,isUser:req.session.puesto, tramitesTotalesAgrupadosYSumados, turnoshoy, turnosparticular, turnosprepagas, turnostotal ,isUser:req.session.puesto});
    }  catch (error) {
        console.error(error);
        return res.status(404).json({msg:"fallo",error:error});
        }

});

turneroHtmlRouter.get("/mostrarPantalla",async (req, res) => {
    const numero = req.query.numero;
    const puesto = req.query.puesto;
    
    const data = {
        numero: numero, // Número de turno
        puesto: puesto, // Puesto
      };
    socketServer.emit('muestraTurnos', { data});
    return res.status(200).json({msg:"ok"});
});

    
