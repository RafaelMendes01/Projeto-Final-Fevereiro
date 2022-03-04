const { hash } = require('bcrypt')
const connect = require('../db/conexao');
const UsuariosSchema = require('../db/schemas/UsuariosSchemas')
class UsuariosServices{
    constructor(){
        this.conexao = connect;
        this.usuarios = UsuariosSchema;
    }
    async createService(req, res){
        const {nome,email,senha} = req.body;
        try {
            await this.conexao();
            const hashSenha = await hash(senha, 11)
            const usuarios = await this.usuarios.create({
                nome,
                email,
                senha: hashSenha
            })
            const {senha: SenhaDoUsuario, ... resto} = usuarios._doc;
            return res.status(201).json({usuarios:resto});  
        } catch (error) {
            console.log(error)
            return res.status(400).json(error);
            
        }
    }
}
module.exports = UsuariosServices;