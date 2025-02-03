import express from "express";
import body_parser from 'body-parser'
import cors from'cors';
import { rutaaut } from "./src/routes/autentication.js";
import productos from './src/routes/productos_routes.js'
import { router_of_user } from "./src/routes/user.router.js";
import { validarToken } from "./src/controller/atutentication.js";
import {router_client }from"./src/routes/router_client.js"
import {router_pedidos }from"./src/routes/router.pedidos.js";
import { router_venta } from "./src/routes/router.sales.js";
const servidor = express();

const port = 3333;


// configuraciones
servidor.get('/', (req, res) =>{
    res.send('Hola mundo')
})
servidor.use('/img', express.static('public/img'));
servidor.use(cors())
servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended:false}))

//configuracion de rutas
servidor.use(rutaaut)
servidor.use( productos)
servidor.use( router_of_user)
servidor.use(router_pedidos)
servidor.use(router_client)
servidor.use(router_venta)

//se configura para probar que el servidor ecuche el port 
servidor.listen(port, ()=>{
    console.log("servidor corriendo en el puerto "+port)
})

