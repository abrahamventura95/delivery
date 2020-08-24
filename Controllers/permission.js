var queries		= require('../DB/Connections/permission');

exports.create = function(req, res) {
	var permission = {
		service: req.body.service,
		user: 	req.body.user
	};				
	queries.create(permission, function(err, data){
		res.json(data);
	});
};

exports.get = function(req, res) {
	queries.get(req.param('id'), function(err, data){
		res.json(data);
	});
}

exports.edit = function(req, res){
	var permission = {
		id: 	req.param('id'),
		status: req.body.status
	};					
	queries.edit(permission, function(err, data){
		res.json(data);
	});
}

exports.delete = function(req, res){
	queries.delete(req.param('id'), function(err, data){
		res.json(data);
	});
}
