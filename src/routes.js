const express = require('express');

const routes = express.Router();

routes.get('/', (req , res) =>{
    return res.status(200).json("rota em funcionamento")
})

module.exports = routes;