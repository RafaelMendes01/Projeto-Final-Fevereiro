const { verify } = require('jsonwebtoken');

class middleware {
    validateToken(req,res,next){
        if(!req.headers.authorization){
            return res.status(401).json({error : 'invalid token'})
        }
        const token = req.headers.authorization.replace('Bearer', '').trim();
        const validate = verify(token, process.env.KEY_MASTER_JWT);
        if(!validate){
            return res.status(401).json({error : 'invalid token'})
        }
        next();
    }
}
module.exports = middleware;