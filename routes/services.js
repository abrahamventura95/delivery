var auth 		= require('../Middleware/auth');
var controller 	= require('../Controllers/service');
var permission	= require('../Controllers/permission');

module.exports = function(app) {	
	app.route('/service')
	  	.get(auth.check, controller.get)
	  	.post(auth.check, auth.isDelivery, controller.create)
		.put(auth.check, auth.isDelivery, controller.edit)
		.delete(auth.check, auth.isDelivery, controller.delete);
	app.route('/service/permission')
	  	.get(auth.check, permission.get)
	  	.post(auth.check, auth.isOwner, permission.create)
		.put(auth.check, permission.edit)
		.delete(auth.check, auth.isOwner, permission.delete);	
	app.route('/services')
	  	.get(auth.check, controller.getAll);
};
