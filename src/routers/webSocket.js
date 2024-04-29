import fs from "fs";
import { __dirname } from "../utils.js";


// webSocket.js
export default function webSocket(socketServer) {
    const io = socketServer;
  
    io.on('connection', (socket) => {

      console.log('Nuevo cliente conectado '+socket.id);
      
  
      // Manejo de desconexiones de clientes
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });

    });
  }
  

