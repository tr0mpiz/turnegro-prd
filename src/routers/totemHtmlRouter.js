import express from "express";
import fs from "fs";
import { __dirname, __filename,ejecutarConsulta } from "../utils.js";
import { socketServer } from "../app.js"; // Importa el objeto io desde app.js
//import { agendaService } from "../services/agenda.services.js";
//import { agendaModel } from "../DAO/models/agenda.model.js";

export const totemHtmlRouter = express.Router();

//const Service = new agendaService();

totemHtmlRouter.get("/", async (req, res) => {
    try {
       //tra los tramites nombre y id
       const tramites = await ejecutarConsulta(`SELECT * FROM tramites`);
        return res.status(200).render("totem", { tramites });
    }  catch (error) {
        console.error(error);
        return res.status(404).json({msg:"fallo"});
      }

   
});


totemHtmlRouter.post("/",async (req, res) => {
    let id=req.query.id;
       try {
            //crea un query para hacer un insert a la tabla turnos INSERT INTO `turnos`(`id`, `tramite_id`, `dia_semana`, `fecha`, `hora`, `estado_id`, `usuario_id`, `puesto_id`, `comentario`, `horafin`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]')
            // crea las variables fecha , hora HH:MM:SS y dia_semana como texto en español
            //la fecha AAAA-MM-DD
            let fecha = new Date();
            const fechaActual = fecha.toISOString().slice(0, 10);

            let hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
            let dia_semana = fecha.toLocaleDateString("es-ES", { weekday: "long" });
            console.log(hora)
            //crea el turno
            const turno = await ejecutarConsulta(`INSERT INTO turnos (tramite_id, dia_semana, fecha, hora, estado_id, usuario_id, puesto_id, comentario, horafin) VALUES ('${id}','${dia_semana}','${fechaActual}','${hora}','1','1','1',' ','00:00:00')`);
            //trae toda la info del turno creado y los nombres los ids estado_id y tramite_id.
            const turnoCreado = await ejecutarConsulta(`SELECT a.*, b.nombre AS nombretramite, c.nombre AS nombreestado, LEFT(b.nombre, 1) AS primera_letra,RIGHT(b.nombre, 1) AS ultima_letra, DATE_FORMAT(a.fecha, '%d/%m/%Y') AS fechaf,b.requisitos FROM turnos a, tramites b, estados_turnos c  WHERE a.tramite_id = b.id AND a.estado_id = c.id AND a.id = ${turno.insertId}`);
            //que haga un return de la info del turno creado y estado
            socketServer.emit('agregarFila', turnoCreado);
            return res.status(200).json(turnoCreado);
       }  catch (error) {
           console.error(error);
           return res.status(404).json({msg:"fallo"});
         }
       
   });
  


