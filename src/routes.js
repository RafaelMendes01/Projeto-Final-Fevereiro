const express = require('express');
const UsuariosControllers = require('./controllers/UsuariosControllers')
const UsuariosSchema = require('./db/schemas/UsuariosSchemas')
const usuarioscontroller = new UsuariosControllers();

const routes = express.Router();

routes.get('/', (req , res) =>{
    return res.status(200).json("rota em funcionamento")
})
routes.route('/usuarios')
.post((req,res)=>{
    return usuarioscontroller.createControllers(req,res)
})
.get(async (req,res) => await usuarioscontroller.getAllController(req,res))

routes.route('/usuarios/show')
.get(async (req,res) => usuarioscontroller.showController(req,res))
module.exports = routes;