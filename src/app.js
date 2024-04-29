import express from "express";
import session from "express-session";

import { turneroHtmlRouter } from "./routers/turneroHtmlRouter.js";
import { loginHtmlRouter } from "./routers/loginHtmlRouter.js";
import { totemHtmlRouter } from "./routers/totemHtmlRouter.js";
import { cosultaHtmlRouter } from "./routers/cosultaHtmlRouter.js";
import handlebars from "express-handlebars";
import path from "path";
import { con, __dirname,upload, user } from "./utils.js";
import { Server } from 'socket.io';
import http from 'http';
import webSocket from "./routers/webSocket.js";

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
const socketServer = new Server(httpServer);
export { socketServer };
webSocket(socketServer); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura Handlebars
const hbs = handlebars.create({
  // Opciones de Handlebars
});

// Define el helper "compare"
hbs.handlebars.registerHelper("compare", function (a, b, options) {
  if (a === b) {
      return options.fn(this);
  }
  return options.inverse(this);
});

// Asigna el motor de plantillas
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: 'UOCRAPRESENTE', // Cambia esto por una cadena secreta más segura
  resave: false,
  saveUninitialized: true
}));
//Rutas: API REST CON JSON
// app.use("/api/products", productRouter);
// app.use("/api/carts", cartRouter);
//Rutas: HTML RENDER SERVER SIDE
app.use("/turnero", turneroHtmlRouter);
app.use("/login", loginHtmlRouter);
app.use("/totem", totemHtmlRouter);
app.use("/consulta", cosultaHtmlRouter);
//Rutas: SOCKETS
// app.use("/realtimeproducts", SocketRouter);
// Inicialización del socket.io
app.get("/*", async (req, res) => {
    return res.status(404).json({ status: "error", msg: "no encontrado", data: {} });
});

