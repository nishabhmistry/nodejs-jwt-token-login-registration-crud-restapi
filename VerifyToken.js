var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  	var token = req.headers['x-access-token'];
    console.log(token);
  	if (!token){
    	return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    
  	jwt.verify(token, "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb", function(err, decoded) {
    	if (err)
    		return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    	// if everything good, save to request for use in other routes
    	req.userId = decoded.id;
    	next();
  	});
}

module.exports = verifyToken;
