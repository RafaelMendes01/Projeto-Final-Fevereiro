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
    async getUsuariosService(req,res){
        try {
            await this.conexao();
            const usuarios = await this.usuarios.find();
            const usuarioSemSenha = usuarios.map((value) =>{
                const {senha, ... usuarioSemSenha} = value._doc;
                return usuarioSemSenha;
            })
            return res.status(200).json({usuarios: usuarioSemSenha});
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    async showUsuariosServices(req,res){
        const {email} = req.query;
        try {
            await this.conexao();
            const usuarios = await this.usuarios.findOne({email});
            const {senha, ... usuarioSemSenha} = usuarios._doc;
            return res.status(200).json({usuarios: usuarioSemSenha});
        } catch (error) {
            return res.status(400).json(error);
        } 
    }  
    async DeleteUsuarioServices(req,res){
        const {email} = req.body;
            await this.conexao();
            const usuarios = await this.usuarios.remove({email});
            return res.status(200).json(usuarios)
        }
}
module.exports = UsuariosServices;