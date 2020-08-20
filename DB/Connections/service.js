require('dotenv').config();
var DBHelper 	= require('../helper');

exports.getServices = function(callback) {
	var sqlQuery = "SELECT service.id, email, username, 				\
							name, description, status, image			\
					FROM service, user									\
					WHERE service.owner = user.id 						\
					ORDER BY status, name DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.get = function(id, callback) {
	var sqlQuery = "SELECT email, username, name, description,		\
						   status, image							\
					FROM service, user								\
					WHERE service.id = '" + id + "' AND				\
						  service.owner = user.id";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
	var status = (obj.status == "TRUE");

  	var sqlQuery = "INSERT INTO service (owner, name, description, 		\
  									  status, image)					\
							VALUES ('" + obj.owner			+ "',		\
									'" + obj.name			+ "',		\
									'" + obj.desc			+ "',		\
									"  + status				+ ",		\
									'" + obj.image 			+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};


exports.edit = function(obj, callback) {
	var bool = (obj.status == "TRUE");

	var sqlQuery = 
				"UPDATE `service` SET  										\
				 	    `service`.`status` 		="  + bool		+ ",		\
				 	    `service`.`name`		='" + obj.name 	+ "',		\
				 	    `service`.`description`	='" + obj.desc 	+ "',		\
				 	    `service`.`image`		='" + obj.image + "'		\
				WHERE `service`.`id`			='" + obj.id 	+ "' AND	\
					  `service`.`owner` 		='" + obj.owner + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.delete = function (obj, callback){
	var sqlQuery = "DELETE FROM `service`   					\
					WHERE `id`		= '" + obj.id 	+ "' AND	\
						  `owner` 	= '" + obj.user + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
