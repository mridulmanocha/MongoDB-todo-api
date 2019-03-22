var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {todo} = require('./models/todo.js');
var {user} = require('./models/users.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req , res) => {

	var todo1 = new todo({
		text : req.body.text
	});

	todo1.save().then((result) => {
		res.send(result);
	}, (error) => {
		res.status(400).send(error);
	})
});

app.get('/todos' , (req , res) => {
	todo.find().then((result) => {
		res.send({result})
	}, (error) => {
		res.status(400).send(error);
	});
});


app.listen(3000, () => {
	console.log('server is up and running on port 3000');
}
);

module.exports = {app};