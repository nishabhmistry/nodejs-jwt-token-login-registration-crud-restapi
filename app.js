var express = require("express");
const bodyParser = require('body-parser');

let app = express();
var routes = require("./routes");

var cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', 'pass front-end url');
  	res.header(
    	'Access-Control-Allow-Headers',
    	'Origin, X-Requested-With, Content-Type, Accept'
  	);
  	next();
});


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use("/",routes);

// Start with localhost:8000
app.listen(8000, function(){
 	console.log("started!");
});
