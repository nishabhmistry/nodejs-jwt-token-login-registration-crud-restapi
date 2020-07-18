var db = require("./../db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var express = require("express");
var app = express();

var cors = require('cors');
app.use(cors());

// Create and Save a new User
exports.create = (req, res) => {
    
    var msg = "";
    if(!req.body.fname) {
    	msg = "First name can not be empty";
    } if(!req.body.lname) {
    	msg = "Last name can not be empty";
    } if(!req.body.email) {
    	msg = "Email can not be empty";
    } if(!req.body.password) {
    	msg = "Password can not be empty";
    }
    if(msg){
	    return res.status(400).send({
	        message: msg
	    });
	}

	req.body.password = bcrypt.hashSync(req.body.password, 8);
	req.body.created_at = new Date();
	var query = db.query('INSERT INTO user SET ?', req.body, function(err, result) {
		if(err){
		    res.status(500).send({
        		message: err.message || "Some error occurred."
    		});		
		}
		res.status(200).send({
    		message: "User registered successfully"
		});
	});
};

// Login
exports.login = (req, res) => {

	var msg = "";
    if(!req.body.email) {
    	msg = "Email can not be empty";
    } if(!req.body.password) {
    	msg = "Password can not be empty";
    } if(msg){
	    return res.status(400).send({
	        message: msg
	    });
	}

	db.query('SELECT * FROM user WHERE email = ?', req.body.email, function(err, user) {
		
		if (err) return res.status(500).send('Error on the server.');
    	if (!user) return res.status(404).send('No user found.');
 		
 		var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
 		console.log(passwordIsValid);
 	 	if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

		var token = jwt.sign({ id: user.id }, "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb", {
	      	expiresIn: 86400 // expires in 24 hours
	    });
	    res.status(200).send({ auth: true, token: token });
	});
};
