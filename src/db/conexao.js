const mongoose = require('mongoose')

const conexao = {
    isConnected:0
};

const uri = process.env.MONGO_URI;

const connect = async () =>{
    if(conexao.isConnected){
        return;
    }
    const db = await mongoose.connect(uri);
    conexao.isConnected = db.connections[0].readyState;
};
module.exports = connect;