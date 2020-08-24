var DBHelper 	= require('../helper');

exports.get = function(id, callback) {
	var sqlQuery = "SELECT request.*, user.email, user.custom,			\
						   user.tlfn, manager.email, manager.custom, 	\
						   service.name, service.status					\
					FROM request, user, service, user as manager 		\
					WHERE service.id 		   = '" + id + "' 		AND	\
						  request.idservice    = service.id   		AND \
						  manager.id    	   = request.idmanager  AND \
						  user.id 			   = request.iduser			\
					ORDER BY request.status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByStatus = function(obj, callback) {
	var sqlQuery = "SELECT request.*, user.email, user.custom,			\
						   user.tlfn, manager.email, manager.custom, 	\
						   service.name, service.status					\
					FROM request, user, service, user as manager 		\
					WHERE service.id 		   = '" + obj.id + "' 	AND	\
						  request.idservice    = service.id   		AND \
						  manager.id    	   = request.idmanager  AND \
						  user.id 			   = request.iduser		AND	\
						  request.status 	   = '" + obj.status + "'	\
					ORDER BY request.created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByManager = function(obj, callback) {
	var sqlQuery = "SELECT request.*, user.email, user.custom,			\
						   user.tlfn, manager.email, manager.custom, 	\
						   service.name, service.status					\
					FROM request, user, service, user as manager 		\
					WHERE service.id 		   = '" + obj.id + "' 	AND	\
						  request.idservice    = service.id   		AND \
						  manager.id    	   = request.idmanager  AND \
						  user.id 			   = request.iduser		AND	\
						  manager.id 	   	   = '" + obj.user + "'	\
					ORDER BY request.status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByUser = function(obj, callback) {
	var sqlQuery = "SELECT request.*, user.email, user.custom,			\
						   user.tlfn, manager.email, manager.custom, 	\
						   service.name, service.status					\
					FROM request, user, service, user as manager 		\
					WHERE request.idservice    = service.id   		AND \
						  manager.id    	   = request.idmanager  AND \
						  user.id 			   = request.iduser		AND	\
						  user.id 	   		   = '" + obj.user + "'		\
					ORDER BY request.created_at, request.status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
  	var sqlQuery = "INSERT INTO request (idservice, iduser, idmanager,	\
  										 from_lat, from_lng, to_lat, 	\
  										 to_lng, msg)					\
							VALUES ('" + obj.service	+ "',			\
									'" + obj.user		+ "',			\
									'" + obj.manager	+ "',			\
									'" + obj.from_lat	+ "',			\
									'" + obj.from_lng	+ "',			\
									'" + obj.to_lat		+ "',			\
									'" + obj.to_lng		+ "',			\
									'" + obj.msg 		+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.edit = function(obj, callback) {
	if(obj.status == "on way"){
		var sqlQuery = 
				"UPDATE `request` SET  										 \
				 	    `request`.`idmanager` 	 ='"   + obj.manager	+ "',\
				 	    `request`.`from_lat` 	 ='"   + obj.from_lat	+ "',\
				 	    `request`.`from_lng` 	 ='"   + obj.from_lng	+ "',\
				 	    `request`.`to_lat` 		 ='"   + obj.to_lat		+ "',\
				 	    `request`.`to_lng` 		 ='"   + obj.to_lng		+ "',\
				 	    `request`.`from_time` 	 = 		CURRENT_TIMESTAMP	,\
				 	    `request`.`msg` 		 ='"   + obj.msg		+ "',\
				 	    `request`.`status` 		 ='"   + obj.status		+ "' \
				WHERE `request`.`id`			 ='"   + obj.id 		+ "'";
		DBHelper.doQuery(sqlQuery, function(err, data) {
			console.log(err);
			callback(err,data);
		});
	}
	if(obj.status == "delivered"){
		var sqlQuery = 
				"UPDATE `request` SET  										 \
				 	    `request`.`idmanager` 	 ='"   + obj.manager	+ "',\
				 	    `request`.`from_lat` 	 ='"   + obj.from_lat	+ "',\
				 	    `request`.`from_lng` 	 ='"   + obj.from_lng	+ "',\
				 	    `request`.`to_lat` 		 ='"   + obj.to_lat		+ "',\
				 	    `request`.`to_lng` 		 ='"   + obj.to_lng		+ "',\
				 	    `request`.`delivery_time`= 		CURRENT_TIMESTAMP	,\
				 	    `request`.`msg` 		 ='"   + obj.msg		+ "',\
				 	    `request`.`status` 		 ='"   + obj.status		+ "' \
				WHERE `request`.`id`			 ='"   + obj.id 		+ "'";
		DBHelper.doQuery(sqlQuery, function(err, data) {
			callback(err,data);
		});
	}
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM `request`   	\
					WHERE `id` 	= '" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
