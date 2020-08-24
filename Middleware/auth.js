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

exports.isOwner = function(req, res, next){
    var sqlQuery = "SELECT COUNT(id) as val                              \
                    FROM service                                         \
                    WHERE service.owner = '" + req.user.sub     + "' AND \
                          service.id    = '" + req.body.service + "'"; 
    DBHelper.doQuery(sqlQuery, function(err, data) {
        console.log(data);
        if(data[0].val != 1) return res.sendStatus(process.env.UNAUTHORIZED);
        next();
    });
}