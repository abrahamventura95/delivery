var queries		= require('../DB/Connections/service');
var stats 		= require('../DB/Connections/stats');

exports.getAll= function(req, res) {
	queries.getServices(function(err, data){
		res.json(data);
	});
};

exports.create = function(req, res) {
	var service = {
		owner: 	req.user.sub,
		name: 	req.body.name,
		desc: 	req.body.desc,
		image: 	req.body.image,
		status: req.body.status
	};				
	queries.create(service, function(err, data){
		res.json(data);
	});
};

exports.get = function(req, res) {
	queries.get(req.param('id'), function(err, data){
		res.json(data);
	});
}

exports.edit = function(req, res){
	var service = {
		id: 	req.param('id'),
		owner: 	req.user.sub,
		name: 	req.body.name,
		desc: 	req.body.desc,
		image: 	req.body.image,
		status: req.body.status
	};					
	queries.edit(service, function(err, data){
		res.json(data);
	});
}

exports.delete = function(req, res){
	var service = {
		id: req.param('id'),
		user: req.user.sub
	};
	queries.delete(service, function(err, data){
		res.json(data);
	});
}

exports.getStats = function(req, res) {
	stats.getStatsService(req.param('id'), function(err, data){
		res.json(data);
	});
};