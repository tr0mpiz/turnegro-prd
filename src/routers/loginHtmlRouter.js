import express from "express";
import { con, upload } from "../utils.js";
import fs from "fs";
import { __dirname, __filename,ejecutarConsulta } from "../utils.js";

//import { agendaService } from "../services/agenda.services.js";
//import { agendaModel } from "../DAO/models/agenda.model.js";

export const loginHtmlRouter = express.Router();

//const Service = new agendaService();

loginHtmlRouter.get("/", async (req, res) => {
    try {
       
        return res.status(200).render("login");
    }  catch (error) {
        console.error(error);
        return res.status(404).json({msg:"fallo"});
      }

   
});

loginHtmlRouter.get("/alta", async (req, res) => {
        return res.status(200).render("usuarioalta");
});

loginHtmlRouter.get("/logout", async (req, res) => {

    req.session.puesto = null;
    req.session.puesto_id = null;
    req.session.nombre = null;
    req.session.apellido = null;
    req.session.destroy();
    return res.redirect("/login");

});

loginHtmlRouter.post('/', async (req, res) => {
    const { dni, password } = req.body;

    const consulta = `SELECT * FROM usuarios_sistema WHERE dni = '${dni}' AND password = '${password}'`;
    const resultado = await ejecutarConsulta(consulta);
    console.log(resultado);
    if (resultado.length > 0) {
        req.session.puesto = resultado[0].dni;
        req.session.puesto_id = resultado[0].id;
        req.session.nombre = resultado[0].nombre;
        req.session.apellido = resultado[0].apellido;
        req.session.permisos = 0;
        return res.redirect("/turnero");
    }   else {
        //mostra un 
        return res.status(200).render("login", { status: "error", msg: `Puesto o contraseña incorrectos.`});
      }

});

  

loginHtmlRouter.delete("/:pid", async (req, res) => {
    let pid = req.params.pid;
    let agenda = await Service.getById(pid);
    agenda = JSON.parse(JSON.stringify(agenda));
    const rutaArchivo = __dirname + "/public/pictures/" + agenda[0].thumbnail;
    let deleteagenda = await Service.deletedOne(pid);
    console.log(deleteagenda);
    if ((deleteagenda.deletedCount = 0)) {
        return res.status(404).json({ status: "error", msg: `No Existe un agendao con ID: ${pid}`, data: {} });
    } else {
        fs.unlink(rutaArchivo, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("No se pudo eliminar el archivo.");
            }
        });
        let allagendaos = await Service.getAll();
        allagendaos = JSON.parse(JSON.stringify(allagendaos));
        console.log("allagendaos", allagendaos);
        return res.status(200).render("home", { agendaos: allagendaos });
    }
});

loginHtmlRouter.put("/:pid", async (req, res) => {
    let pid = req.params.pid;
    let obj = req.body;
    let agenda = await Service.updateOne(pid, obj.agenda);
    if (agenda) {
        let agenda = await Service.getAll();
        agenda = JSON.parse(JSON.stringify(agenda));
        return res.status(200).render("home", { agendaos: agenda });
    } else {
        return res.status(404).json({ status: "error", msg: `No Existe un agendao con ID: ${pid}`, data: {} });
    }
});