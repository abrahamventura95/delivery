const jwt 		= require('jsonwebtoken');
var DBHelper 	= require('../DB/helper');

exports.check = function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) 
    	return res.sendStatus(process.env.UNAUTHORIZED);
    
    jwt.verify(token, process.env.secretOrKey, (err, user) =>{
        if (err) return res.sendStatus(process.env.FORBIDDEN);
        req.user = user;
        next();
    });
}

exports.isDelivery = function(req, res, next){
	if(req.user.type != 'delivery') return res.sendStatus(process.env.UNAUTHORIZED);
    next();			    
}