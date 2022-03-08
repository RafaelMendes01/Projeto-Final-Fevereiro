const express = require('express');
const UsuariosControllers = require('./controllers/UsuariosControllers');
const AuthController = require('./controllers/auth_controller');
const middleware = require("./middleware/validarToken");
const UsuariosSchema = require('./db/schemas/UsuariosSchemas');
const { route } = require('express/lib/application');
const usuarioscontroller = new UsuariosControllers();
const authController = new AuthController;

const routes = express.Router();

routes.get('/', (req , res) =>{
    return res.status(200).json("rota em funcionamento")
})
routes.route('/login')
 .post(async (req,res) => await authController.loginController(req,res))

routes.route('/usuarios')
.post((req,res)=>{
    return usuarioscontroller.createControllers(req,res)
})
.delete((req,res)=>{
    return usuarioscontroller.deleteController(req,res)
}) 


routes.use(new middleware().validateToken)

routes.route('/usuarios')
.get(async (req,res) => await usuarioscontroller.getAllController(req,res))

routes.route('/usuarios/show')
.get(async (req,res) => usuarioscontroller.showController(req,res))


module.exports = routes;