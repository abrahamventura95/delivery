var DBHelper 	= require('../helper');

exports.getStatsService = function(id, callback) {
	var sqlCommonU = "SELECT user.email, user.username,					\
							 count(request.id) as num 					\
					FROM request, user 									\
					WHERE request.idservice		= '" + id + "' 		AND	\
						  user.id 			    = request.iduser		\
					GROUP BY user.email, user.username					\
					ORDER BY num DESC";
	var sqlCommonM = "SELECT user.email, user.username,					\
							 count(request.id) as num 					\
					FROM request, user 									\
					WHERE request.idservice		= '" + id + "' 		AND	\
						  user.id 			    = request.idmanager		\
					GROUP BY user.email, user.username					\
					ORDER BY num DESC";
	var sqlCommonMM = "SELECT user.email, user.username,					\
							 count(request.id) as num 						\
					   FROM request, user 									\
					   WHERE request.idservice	= '" + id + "' 			AND	\
						  user.id 			    = request.idmanager		AND	\
						  request.status		= 'delivered'			AND	\
						  MONTH(request.delivery_time) = 					\
						  			MONTH(CURRENT_TIMESTAMP)				\
					GROUP BY user.email, user.username						\
					ORDER BY num DESC";								
	var sqlReqMonth = "SELECT count(id) as num 								\
					   FROM request											\
					   WHERE idservice		= '" + id + "' 		AND			\
						  MONTH(delivery_time) = MONTH(CURRENT_TIMESTAMP)";	
	var sqlProm = "SELECT AVG(time) as time, AVG(qualification) as qual,	\
							idmanager 									\
					FROM request_end										\
					WHERE idservice		= '" + id + "'";
	DBHelper.doQuery(sqlCommonU, function(err, CU) {
		DBHelper.doQuery(sqlCommonM, function(err, CM) {
			DBHelper.doQuery(sqlCommonMM, function(err, MMM) {
				DBHelper.doQuery(sqlReqMonth, function(err, RM) {
					DBHelper.doQuery(sqlProm, function(err, Prom) {
						var data = {
							commonUser: CU,
							commonManager: CM,
							mostMonthManager: MMM,
							requestMonth: RM,
							statsManager: Prom
						}
						callback(err, data);
					});
				});
			});
		});
	});
};

exports.getStatsUser = function(id, callback) {
	var sqlCommonS = "SELECT service.name, COUNT(request.id) as num		\
					FROM request, service 								\
					WHERE request.iduser	= '" + id + "' 		AND		\
						  service.id 		= request.idservice			\
					GROUP BY service.name								\
					ORDER BY num DESC";
	var sqlCommonSM = "SELECT service.name, COUNT(request.id) as num		\
						FROM request, service 								\
						WHERE request.iduser	= '" + id + "' 		AND		\
							  service.id 		= request.idservice	AND		\
							  MONTH(request.created_at) = 					\
							  		MONTH(CURRENT_TIMESTAMP)				\
						GROUP BY service.name								\
						ORDER BY num DESC";									
	DBHelper.doQuery(sqlCommonS, function(err, CS) {
		DBHelper.doQuery(sqlCommonSM, function(err, CSM) {
			var data = {
				commonService: CS,
				commonServiceMonth: CSM
			}
			callback(err, data);
		});
	});
};
