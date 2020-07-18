var db = require("./../db");

var express = require("express");
var app = express();

// Create and Save a new User
exports.create = (req, res) => {
    
    var msg = "";
    if(!req.body.name) {
    	msg = "Name can not be empty";
    } if(!req.body.duedate) {
    	msg = "Due date can not be empty";
    } if(!req.body.label) {
    	msg = "Label can not be empty";
    } if(!req.body.status) {
    	msg = "Status can not be empty";
    }
    if(msg){
	    return res.status(400).send({
	        message: msg
	    });
	}

	req.body.create_at = new Date();
	var query = db.query('INSERT INTO tasks SET ?', req.body, function(err, result) {
		if(err){
		    res.status(500).send({
        		message: err.message || "Some error occurred."
    		});		
		}
		res.send(result);
	});
};

// task list
exports.list = (req, res) => {
    
    var query = db.query('SELECT t.id,t.name,t.status,l.name as labelName FROM tasks t join label l on l.id = t.label', function(err, result) {
		if(err){
		    res.status(500).send({
        		message: err.message || "Some error occurred."
    		});		
		}
		res.send(result);
	});
};

// label list
exports.label = (req, res) => {
    
    var query = db.query('SELECT * FROM label', function(err, result) {
		if(err){
		    res.status(500).send({
        		message: err.message || "Some error occurred."
    		});		
		}
		res.send(result);
	});
};

// create label
exports.createlabel = (req, res) => {
    
    req.body.create_at = new Date();
    var query = db.query('INSERT INTO label SET ?', req.body, function(err, result) {
		if(err){
		    res.status(500).send({
        		message: err.message || "Some error occurred."
    		});		
		}
		res.status(200).send({
    		message: "Label created successfully."
		});
	});
};

// create label
exports.search = (req, res) => {
    var params = [];
    var sql = "select t.id,t.name,t.status,l.name as labelName from tasks t join label l on l.id = t.label where 1 = 1";
    
    if (req.body.duedate !== '') {
    	sql += ' and t.duedate = ?';
    	params.push(req.body.duedate);
  	}
  	if (req.body.label !== '') {
    	sql += ' and t.label = ?';
    	params.push(req.body.label);
  	}
  	if (req.body.status !== '') {
    	sql += ' and t.status = ?';
    	params.push(req.body.status);
  	}

    var query = db.query(sql, params, function(err, result) {
		if(err){
		    res.status(500).send({
        		message: err.message || "Some error occurred."
    		});		
		}
		res.send(result);
	});
};
