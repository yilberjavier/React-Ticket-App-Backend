// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Htttp server
        this.server = http.createServer( this.app );

        // Configuraciones de sockets
        this.io = socketio( this.server, { /* Configuraciones  */ } );

        // Inicializar Sockets
        this.Sockets = new Sockets( this.io );

    }

    middlewares() {

        // Desplegar el directorio Publico
        this.app.use( express.static( path.resolve( __dirname , '../public' )) );

        // CORS
        this.app.use( cors() );

        // Get de los últimos ticket 
        this.app.get( '/ultimos', (req, res) => {

            res.json({
                ok: true,
                ultimos: this.Sockets.ticketList.ultimos13
            });

        });

    }

    // configurarSockets() {
        
    //     new Sockets( this.io );

    // }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server correindo en puerto:', this.port );
        });
        
    }




}

module.exports = Server;



