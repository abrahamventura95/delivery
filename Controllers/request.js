var validator	= require('validator');
var queries		= require('../DB/Connections/request');

function validate(body, callback) {
	//Empty validation
	if(validator.isEmpty(body.qual) || body.qual > 5 || body.qual < 0){
		callback('Qualification value is wrong [0,5].');
	}else{
		if(validator.isEmpty(body.status) || 
			!validator.isIn(body.status,['pending',
										 'acepted',
										 'on way',
										 'delivered',
										 'canceled'])){
				callback('Status out of range');
		}else{
			callback('pass');
		}
		callback('pass');
	}
};

exports.get = function(req, res) {
	queries.get(req.param('id'), function(err, data){
		res.json(data);
	});
}

exports.getByStatus = function(req, res) {
	var obj = {
		id: req.param('id'),
		status: req.body.status
	}
	queries.getByStatus(obj, function(err, data){
		res.json(data);
	});
}

exports.getByManager = function(req, res) {
	var obj = {
		id: req.param('id'),
		user: req.user.sub
	}
	queries.getByManager(obj, function(err, data){
		res.json(data);
	});
}

exports.getByUser = function(req, res) {
	var obj = {
		user: req.user.sub
	}
	console.log('test');
	queries.getByUser(obj, function(err, data){
		res.json(data);
	});
}

exports.create = function(req, res) {
	var request = {
		service: 	req.body.service,
		user: 		req.user.sub,
		manager: 	req.body.manager,
		from_lat: 	req.body.from_lat,
		from_lng: 	req.body.from_lng,
		to_lat: 	req.body.to_lat,
		to_lng: 	req.body.to_lng,
		msg: 		req.body.msg
	};							
	queries.create(request, function(err, data){
		res.json(data);
	});
};

exports.edit = function(req, res){
	validate(req.body, function(value){
		try{
			if (value == 'pass') {
				var request = {
					id: 		req.param('id'),
					manager: 	req.body.manager,
					from_lat: 	req.body.from_lat,
					from_lng: 	req.body.from_lng,
					to_lat: 	req.body.to_lat,
					to_lng: 	req.body.to_lng,
					qual: 		req.body.qual,
					msg: 		req.body.msg,
					status: 	req.body.status
				};					
				queries.edit(request, function(err, data){
					res.json(data);
				});
			}
			else 
				throw Error(value);
		}catch(err){
			obj = {
				error: 	process.env.BAD_REQUEST,
				msg: 	err.message
			};
			res.json(obj);
		}
	});
}

exports.delete = function(req, res){
	queries.delete(req.param('id'), function(err, data){
		res.json(data);
	});
}
