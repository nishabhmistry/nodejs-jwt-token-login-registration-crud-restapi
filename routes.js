var express = require("express");
const router = express.Router();

var VerifyToken = require('./VerifyToken');
const user = require('./controllers/user.controller');
const task = require('./controllers/task.controller');

router.get("/", function(req,res){
   res.send("Home!");
});

// Create a new Note
router.post("/user", user.create);

// Login
router.post("/login", user.login);

// Create Task
router.post("/task", task.create);

// List Task
router.get("/list", VerifyToken, task.list);

// List Label
router.get("/label", VerifyToken, task.label);

// Create Label
router.post("/createlabel", VerifyToken, task.createlabel);

// Search
router.post("/search", VerifyToken, task.search);

module.exports = router;

