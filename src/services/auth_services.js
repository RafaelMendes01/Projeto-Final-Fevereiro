const {compare}= require('bcrypt');
const {sign} = require('jsonwebtoken');
const UsuarioSchema = require('../db/schemas/UsuariosSchemas');
const connect = require('../db/conexao');
const { validate } = require('../db/schemas/UsuariosSchemas');

class authServices{
    #_conexao;
    #_usuarios;

    constructor(){
        this.#_conexao = connect;
        this.#_usuarios = UsuarioSchema;
    }
    async #_validatepassword(senhalogin,senhadb){
        const validate = await compare(senhalogin, senhadb);
        return validate;
    }
    async #_generateToken(Usuario){
        return sign(Usuario, process.env.KEY_MASTER_JWT, {
            expiresIn: '8h',
        });
    }
    async login(req,res){
        const {email,senha} = req.body;
        try {
           await this.#_conexao();
           const usuario = await this.#_usuarios.findOne({email});
           if(!usuario){
            return res.status(400).json({error: "not found!!!"})
           }
           const validatePass = await this.#_validatepassword(senha,usuario.senha);
           if(!validatePass){
            return res.status(401).json({error: "sorry,invalid email or password"})
           }
           const {senha: senhaUsuario,email: emailUsuario, ...resto} = usuario._doc;
           const token = await this.#_generateToken({usuario: resto});
           return res.status(200).json({token});
        } catch (error) {
            return res.status(400).json({error})
        }
    }
};
module.exports = authServices;