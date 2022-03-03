const UsuariosServices = require("../services/UsuariosServices")
class UsuariosControllers{
    constructor(){
        this.services = new UsuariosServices();
    }
    async createControllers(req,res){
        const {nome,email,senha} = req.body
        if(!nome || !email || !senha){
            return res.status(400).json({error: "faltando dados para realizar a requisição"})
        }
        return this.services.createService(req,res)
    }
}

module.exports = UsuariosControllers;