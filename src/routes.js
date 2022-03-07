const express = require('express');
const UsuariosControllers = require('./controllers/UsuariosControllers');
const AuthController = require('./controllers/auth_controller');
const UsuariosSchema = require('./db/schemas/UsuariosSchemas');
const usuarioscontroller = new UsuariosControllers();
const authController = new AuthController;

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

routes.route('/login')
 .post(async (req,res) => await authController.loginController(req,res))
module.exports = routes;