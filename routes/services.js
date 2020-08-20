var auth 		= require('../Middleware/auth');
var controller 	= require('../Controllers/service');

module.exports = function(app) {	
	app.route('/service')
	  	.get(auth.check, controller.get)
	  	.post(auth.check, auth.isDelivery, controller.create)
		.put(auth.check, auth.isDelivery, controller.edit)
		.delete(auth.check, auth.isDelivery, controller.delete);
	app.route('/services')
	  	.get(auth.check, controller.getAll);
};
