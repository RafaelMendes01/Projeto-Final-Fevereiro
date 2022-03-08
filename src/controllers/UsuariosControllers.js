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
    async getAllController(req,res){
       return this.services.getUsuariosService(req,res)
    }
    async showController(req,res){
        const {email} = req.query;
        if(!email){
            return res.status(400).json({error : "email incorreto ou inexistente"}); 
        }
        return this.services.showUsuariosServices(req,res);
    }
    async deleteController(req,res){
        const {email} = req.body;
        if(!email){
            return res.status(400).json({error: "email incorreto ou inexistente"})
        }
        return this.services.DeleteUsuarioServices(req,res);
    }
}

module.exports = UsuariosControllers;