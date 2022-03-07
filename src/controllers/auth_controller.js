const authServices = require('../services/auth_services');

class authController {
    #_services;

    constructor() {
        this.#_services = new authServices()
    }
    async loginController(req,res){
        if(!req.body.email || !req.body.senha ){
            return res.status(400).json({error : "email ou senha invalidos!!"});
        }
        return this.#_services.login(req,res);
    }
};

module.exports = authController