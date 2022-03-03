const express = require('express');
const UsuariosControllers = require('./controllers/UsuariosControllers')
const usuarioscontroller = new UsuariosControllers();

const routes = express.Router();

routes.get('/', (req , res) =>{
    return res.status(200).json("rota em funcionamento")
})
routes.route('/usuarios')
.post((req,res)=>{
    return usuarioscontroller.createControllers(req,res)
})

module.exports = routes;