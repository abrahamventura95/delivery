require('dotenv').config();
var DBHelper 	= require('../helper');

exports.get = function(id, callback) {
	var sqlQuery = "SELECT permission.id, email, username, custom,	\
						   permission.status						\
					FROM permission, user, service 					\
					WHERE service.id 		   = '" + id + "' AND	\
						  permission.idservice = service.id   AND 	\
						  user.id 			   = permission.iduser";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
	var status = (obj.status == "TRUE");

  	var sqlQuery = "INSERT INTO permission (idservice, iduser)		\
							VALUES ('" + obj.service	+ "',		\
									'" + obj.user 		+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};


exports.edit = function(obj, callback) {
	var status = (obj.status == "TRUE");

	var sqlQuery = 
				"UPDATE `permission` SET  									\
				 	    `permission`.`status` 		="  + status	+ ",	\
				 	    `permission`.`updated_at`	= CURRENT_TIMESTAMP()	\
				WHERE `permission`.`id`				='" + obj.id 	+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM `permission`   	\
					WHERE `id` 	= '" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
